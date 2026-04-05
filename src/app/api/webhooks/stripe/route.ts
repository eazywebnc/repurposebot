import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PLANS, type PlanId } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        // Determine the plan from metadata
        const planId = (session.metadata?.planId || "pro") as PlanId;
        const planConfig = PLANS[planId];

        await supabaseAdmin
          .from("rb_settings")
          .update({
            plan: planId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            articles_limit: planConfig.articlesLimit,
          })
          .eq("stripe_customer_id", customerId);

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = (invoice as unknown as Record<string, unknown>).customer as string;

        // Reset monthly usage on successful payment
        await supabaseAdmin
          .from("rb_settings")
          .update({ articles_used: 0 })
          .eq("stripe_customer_id", customerId);

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const paymentIntent = (invoice as unknown as Record<string, unknown>).payment_intent;

        console.error(
          `Payment failed for invoice ${invoice.id}, payment_intent: ${paymentIntent}`
        );

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Downgrade to free plan
        await supabaseAdmin
          .from("rb_settings")
          .update({
            plan: "free",
            stripe_subscription_id: null,
            articles_limit: PLANS.free.articlesLimit,
          })
          .eq("stripe_customer_id", customerId);

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const priceId = subscription.items.data[0]?.price.id;

        // Determine plan from price ID
        let planId: PlanId = "free";
        for (const [key, config] of Object.entries(PLANS)) {
          if ("priceId" in config && config.priceId === priceId) {
            planId = key as PlanId;
            break;
          }
        }

        await supabaseAdmin
          .from("rb_settings")
          .update({
            plan: planId,
            articles_limit: PLANS[planId].articlesLimit,
          })
          .eq("stripe_customer_id", customerId);

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
