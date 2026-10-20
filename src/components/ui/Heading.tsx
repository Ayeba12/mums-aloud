import type { ReactNode } from "react";

export type AccentText = { lead: string; accent: string };

/**
 * Editorial heading with one italic accent phrase, e.g. "Empowering Mums to *Thrive*".
 * Inside dark olive sections the accent takes the marigold action colour.
 */
export function Accent({ lead, accent }: AccentText): ReactNode {
  return (
    <>
      {lead} <em className="font-heading italic [.surface-olive_&]:text-action">{accent}</em>
    </>
  );
}
