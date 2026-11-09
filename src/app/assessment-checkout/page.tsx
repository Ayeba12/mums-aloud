import type { Metadata } from "next";
import { ArrowUpRightIcon, CheckIcon, ClipboardTextIcon, LockSimpleIcon } from "@phosphor-icons/react/ssr";
import { JsonLd } from "@/components/content/JsonLd";
import { IconChip, Section, SectionHeading, Tag } from "@/components/layout/Section";
import { ClosingInvite } from "@/components/sections/ClosingInvite";
import { PageHeader } from "@/components/sections/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { assessmentOffer, assessments, CHECKOUT_PATH, checkout } from "@/content/assessments";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: checkout.title,
  description: checkout.description,
  alternates: { canonical: CHECKOUT_PATH },
};

/**
 * Assessment checkout (owner, 9 Nov 2026): one £100 price for any of the three assessments. How it
 * works beside the booking card with the Stripe payment link, then the three forms for those who
 * have paid (`#start`, where Stripe's "after payment" redirect can point), then a free call for
 * the unsure. Stripe hosts the payment itself, so no card details touch this site.
 */
export default function AssessmentCheckoutPage() {
  const { order, steps, start, closing } = checkout;
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
            <ul className="mt-6 flex flex-col gap-2 border-t border-border-decoration pt-6">
              {order.includes.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckIcon aria-hidden size={20} weight="bold" className="mt-1 shrink-0 text-action" />
                  {point}
                </li>
              ))}
            </ul>
            <ButtonLink href={stripeUrl} size="large" arrow className="mt-8 w-full justify-between pl-6">
              {order.pay}
              <span className="sr-only">(opens Stripe&apos;s secure payment page)</span>
            </ButtonLink>
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

      <Section id="start" aria-labelledby="start-heading" className="scroll-mt-24">
        <SectionHeading id="start-heading" tag={start.tag} heading={start.heading} intro={start.intro} />
        <ul data-reveal="stagger" className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-6">
          {assessments.map((item) => (
            <li key={item.id} className="group relative flex flex-col rounded-card border border-border-decoration bg-surface-card p-6">
              <IconChip>
                <ClipboardTextIcon aria-hidden size={24} />
              </IconChip>
              <h3 className="mt-4 font-body text-title font-semibold text-ink">{item.label}</h3>
              <a href={item.href} className="mt-auto inline-flex min-h-12 items-center gap-2 pt-4 font-semibold after:absolute after:inset-0">
                Start this assessment
                <ArrowUpRightIcon aria-hidden size={16} weight="bold" />
                <span className="sr-only">: {item.label} (opens a Google Form)</span>
              </a>
            </li>
          ))}
        </ul>
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
