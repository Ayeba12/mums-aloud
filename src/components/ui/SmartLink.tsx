import Link from "next/link";
import type { ComponentProps } from "react";
import { isPlainHref } from "@/components/ui/Button";

/**
 * A link that knows its destination: in-page anchors, mail, phone and outside links render as
 * plain anchors (the browser scrolls to a hash on every click, where the client router ignores a
 * repeat); site paths render as Next's Link and keep prefetching.
 */
export function SmartLink(props: ComponentProps<typeof Link>) {
  if (isPlainHref(props.href)) {
    const { href, ...rest } = props;
    return <a href={href} {...(rest as ComponentProps<"a">)} />;
  }
  return <Link {...props} />;
}
