import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon, CheckIcon, EnvelopeSimpleIcon, LockSimpleIcon } from "@phosphor-icons/react/ssr";
import { JsonLd } from "@/components/content/JsonLd";
import { Section, SectionHeading, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { PageHeader } from "@/components/sections/PageHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ASSESSMENT_TERMS_PATH, assessmentOffer, assessments, CHECKOUT_PATH, checkout, proofOfPaymentEmail } from "@/content/assessments";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: checkout.title,
  description: checkout.description,
  alternates: { canonical: CHECKOUT_PATH },
};

/**
 * Assessment checkout (owner, 9 Nov 2026): one £100 payment covers all three assessments. How it
 * works beside the booking card, whose Pay button only goes to Stripe once the terms box is ticked
 * (a native `required` checkbox in a GET form, so it works without JavaScript). The assessment
 * forms are never linked here: paid mums receive their links, and `#start` tells anyone still
 * waiting to email us their proof of payment. Stripe hosts the payment, so no card details touch
 * this site.
 */
export default function AssessmentCheckoutPage() {
  const { order, steps, proof, closing } = checkout;
  const { price, stripeUrl, calendly } = assessmentOffer;
  return (
    <main id="main">
      <PageHeader tag={checkout.tag} heading={checkout.heading} intro={checkout.intro}>
        <div data-reveal="stagger" className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-8">
          <section aria-labelledby="steps-heading" className="lg:col-span-6 lg:pt-8">
            <h2 id="steps-heading" className="text-h3">
              {steps.heading}
            </h2>
            <ol className="mt-6 flex flex-col gap-6">
              {steps.items.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span aria-hidden className="inline-flex size-10 shrink-0 items-center justify-center rounded-pill bg-accent font-bold text-on-accent">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-body text-title font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 max-w-[44ch]">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="order-heading" className="rounded-panel border border-border-decoration bg-surface-card p-6 lg:col-span-5 lg:col-start-8 lg:p-8">
            <Tag className="bg-surface">{order.tag}</Tag>
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 id="order-heading" className="text-h3">
                {order.title}
              </h2>
              <p className="font-heading text-h2 text-ink">{price.label}</p>
            </div>
            <p className="mt-2 text-text-secondary">{order.note}</p>
            <div className="mt-6 border-t border-border-decoration pt-6">
              <p className="font-bold text-ink">{order.includesLabel}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {assessments.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <CheckIcon aria-hidden size={20} weight="bold" className="mt-1 shrink-0 text-action" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <form action={stripeUrl} method="get" className="mt-8">
              <label className="flex min-h-12 cursor-pointer items-start gap-3">
                <input type="checkbox" required aria-describedby="terms-hint" className="mt-0.5 size-5 shrink-0 cursor-pointer accent-action" />
                <span>
                  {order.terms.before}
                  <Link href={ASSESSMENT_TERMS_PATH} target="_blank" rel="noopener" className="font-semibold">
                    {order.terms.link}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </Link>
                  {order.terms.after}
                </span>
              </label>
              <p id="terms-hint" className="mt-1 text-caption text-text-secondary">
                {order.termsHint}
              </p>
              <Button type="submit" size="large" arrow className="mt-6 w-full justify-between pl-6">
                {order.pay}
                <span className="sr-only">(opens Stripe&apos;s secure payment page)</span>
              </Button>
            </form>
            <p className="mt-4 flex items-start gap-2 text-caption text-text-secondary">
              <LockSimpleIcon aria-hidden size={16} weight="bold" className="mt-0.5 shrink-0" />
              {order.secure}
            </p>
            <a href={calendly} className="mt-4 inline-flex min-h-12 items-center gap-1 font-semibold">
              {order.unsure}
              <ArrowUpRightIcon aria-hidden size={16} />
              <span className="sr-only">(opens Calendly)</span>
            </a>
          </section>
        </div>
      </PageHeader>

      <Section id="start" aria-labelledby="proof-heading" className="scroll-mt-24">
        <SectionHeading
          id="proof-heading"
          tag={proof.tag}
          heading={proof.heading}
          intro={proof.intro}
          action={
            <ButtonLink href={proofOfPaymentEmail} variant="secondary" size="large" icon={<EnvelopeSimpleIcon aria-hidden size={20} />}>
              {proof.action}
            </ButtonLink>
          }
        />
      </Section>

      <ClosingInvite id="checkout-closing" heading={closing.heading} body={closing.body} primary={closing.primary} secondary={closing.secondary} />
      <JsonLd
        data={serviceSchema({
          name: assessmentOffer.name,
          description: checkout.description,
          path: CHECKOUT_PATH,
          price: price.amount,
          currency: price.currency,
        })}
      />
    </main>
  );
}
