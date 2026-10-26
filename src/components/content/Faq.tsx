import { PlusIcon } from "@phosphor-icons/react/ssr";

/**
 * The reference's question list, built on native details/summary so it works without
 * JavaScript and announces its state. The plus turns into a cross when open.
 */
export function Faq({ items }: { items: Array<{ q: string; a: string }> }) {
  return (
    <ul className="mx-auto flex max-w-[46rem] flex-col gap-2">
      {items.map((item) => (
        <li key={item.q}>
          <details className="group rounded-card bg-surface-tinted open:bg-surface-card">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-card px-6 py-4 font-body text-title font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-pill bg-surface text-ink transition-transform duration-200 ease-standard group-open:rotate-45 motion-reduce:transition-none">
                <PlusIcon aria-hidden size={16} weight="bold" />
              </span>
            </summary>
            <p className="max-w-reading px-6 pt-0 pb-6">{item.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
