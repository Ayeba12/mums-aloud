import type { StaticImageData } from "next/image";
import type { Profile } from "@/content/about";
import bokun from "@/assets/photos/team/bokun-imoukhuede.webp";
import oyindamola from "@/assets/photos/team/oyindamola.jpg";
import dkJonah from "@/assets/photos/team/dk-jonah.jpg";
import yemi from "@/assets/photos/team/yemi-komolafe.jpg";

/**
 * The team's own portraits, supplied by the client on 26 Oct 2026 (see docs/photo-credits.md),
 * keyed by each profile's id. The photos arrived without names; the owner confirmed Oyindamola
 * (grey background, braids). The other three are provisional until the owner confirms them.
 */
export const teamPortraits: Partial<Record<Profile["id"], { photo: StaticImageData; position?: string }>> = {
  bokun: { photo: bokun, position: "object-[50%_20%]" },
  oyindamola: { photo: oyindamola, position: "object-[50%_20%]" },
  "dk-jonah": { photo: dkJonah, position: "object-[50%_30%]" },
  yemi: { photo: yemi, position: "object-[50%_25%]" },
};
