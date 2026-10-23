import { EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { buttonClasses } from "@/components/ui/Button";

/**
 * The line under a form that says what happened, and, when the online route is not open, the
 * prefilled email that carries what the visitor typed to the team instead.
 */
export function FormStatus({
  status,
  message,
  fallback,
}: {
  status: "idle" | "success" | "error" | "unavailable";
  message?: string;
  fallback?: { href: string; label: string };
}) {
  if (status === "idle" || !message) return null;
  return (
    <div role="status" className={`rounded-card bg-surface p-4 ${status === "error" ? "font-semibold text-error" : "text-ink"}`}>
      <p>{message}</p>
      {fallback && (
        <a href={fallback.href} className={buttonClasses("secondary", "default", "mt-4")}>
          <EnvelopeSimpleIcon aria-hidden size={20} />
          {fallback.label}
        </a>
      )}
    </div>
  );
}
