import type { ReactNode } from "react";

export type AccentText = { lead: string; accent: string };

/** Editorial heading with one italic accent phrase, e.g. "Empowering Mums to *Thrive*". */
export function Accent({ lead, accent }: AccentText): ReactNode {
  return (
    <>
      {lead} <em className="font-heading italic">{accent}</em>
    </>
  );
}
