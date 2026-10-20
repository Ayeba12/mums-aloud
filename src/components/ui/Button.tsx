import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse" | "inverse-outline";
type Size = "default" | "large";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control border-2 px-6 py-3 text-center text-base leading-normal font-bold no-underline transition-colors duration-150 ease-standard cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "border-transparent bg-action text-on-action hover:bg-action-hover hover:text-on-action active:bg-action-pressed",
  secondary:
    "border-berry-lipstick-700 bg-transparent text-berry-lipstick-700 hover:bg-berry-lipstick-50 hover:text-berry-lipstick-700 active:bg-berry-lipstick-100 active:text-berry-lipstick-800",
  inverse:
    "border-transparent bg-black-50 text-berry-lipstick-900 hover:bg-berry-lipstick-50 hover:text-berry-lipstick-900",
  "inverse-outline":
    "border-black-50 bg-transparent text-black-50 hover:bg-berry-lipstick-800 hover:text-black-50",
};

const sizes: Record<Size, string> = {
  default: "min-h-12",
  large: "min-h-14",
};

const disabled =
  "disabled:cursor-not-allowed disabled:border-black-500 disabled:bg-black-100 disabled:text-black-700";

export function buttonClasses(variant: Variant = "primary", size: Size = "default", className = "") {
  return [base, variants[variant], sizes[size], disabled, className].filter(Boolean).join(" ");
}

type CommonProps = { variant?: Variant; size?: Size; icon?: ReactNode; children: ReactNode };

/** Use for actions. For navigation use ButtonLink. */
export function Button({
  variant,
  size,
  icon,
  children,
  className,
  type = "button",
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {icon}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  icon,
  children,
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {icon}
    </Link>
  );
}
