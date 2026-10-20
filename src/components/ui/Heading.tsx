import type { ReactNode } from "react";

/** Editorial heading with an italic accent phrase, e.g. "Empowering Mums to *Thrive*". */
export function Accent({ lead, accent }: { lead: string; accent: string }): ReactNode {
  return (
    <>
      {lead} <em className="font-heading italic">{accent}</em>
    </>
  );
}
