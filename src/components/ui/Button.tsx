import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "inverse" | "inverse-outline";
type Size = "default" | "large";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill border-2 px-6 py-2 text-center text-base leading-normal font-bold no-underline transition-colors duration-150 ease-standard cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "border-transparent bg-action text-on-action hover:bg-action-hover hover:text-on-action active:bg-action-pressed",
  secondary:
    "border-berry-lipstick-700 bg-transparent text-berry-lipstick-700 hover:bg-berry-lipstick-50 hover:text-berry-lipstick-700 active:bg-berry-lipstick-100 active:text-berry-lipstick-800",
  accent: "border-transparent bg-accent text-on-accent hover:bg-marigold-200 hover:text-on-accent",
  inverse:
    "border-transparent bg-black-50 text-berry-lipstick-900 hover:bg-berry-lipstick-50 hover:text-berry-lipstick-900",
  "inverse-outline":
    "border-black-50 bg-transparent text-black-50 hover:bg-black-50/15 hover:text-black-50",
};

const sizes: Record<Size, string> = { default: "min-h-12", large: "min-h-14" };

const disabled =
  "disabled:cursor-not-allowed disabled:border-black-500 disabled:bg-black-100 disabled:text-black-700";

export function buttonClasses(variant: Variant = "primary", size: Size = "default", className = "", arrow = false) {
  return [base, variants[variant], sizes[size], disabled, arrow && "gap-3 pr-2", className].filter(Boolean).join(" ");
}

/** The marigold arrow circle from the brand guide: decorative, inside the pill, 8px from its edge. */
function Arrow({ size }: { size: Size }) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-pill bg-accent text-on-accent ${size === "large" ? "size-10" : "size-8"}`}
    >
      <ArrowRightIcon size={size === "large" ? 20 : 16} weight="bold" />
    </span>
  );
}

type CommonProps = { variant?: Variant; size?: Size; arrow?: boolean; icon?: ReactNode; children: ReactNode };

/** Use for actions. For navigation use ButtonLink. */
export function Button({
  variant,
  size = "default",
  arrow,
  icon,
  children,
  className,
  type = "button",
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button type={type} className={buttonClasses(variant, size, className, arrow)} {...props}>
      {children}
      {icon}
      {arrow && <Arrow size={size} />}
    </button>
  );
}

export function ButtonLink({
  variant,
  size = "default",
  arrow,
  icon,
  children,
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClasses(variant, size, className, arrow)} {...props}>
      {children}
      {icon}
      {arrow && <Arrow size={size} />}
    </Link>
  );
}
