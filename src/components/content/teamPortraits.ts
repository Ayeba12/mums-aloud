import type { StaticImageData } from "next/image";
import type { Profile } from "@/content/about";
import bokun from "@/assets/photos/team/bokun-imoukhuede.webp";
import oyindamola from "@/assets/photos/team/oyindamola.jpg";
import dkJonah from "@/assets/photos/team/dk-jonah.jpg";
import yemi from "@/assets/photos/team/yemi-komolafe.jpg";
import bella from "@/assets/photos/council/bella-abidakun.jpg";
import temi from "@/assets/photos/council/temi-fagbo.jpg";
import bukunmi from "@/assets/photos/council/bukunmi-ladeji.jpg";
import elizabeth from "@/assets/photos/council/elizabeth-toluwani.jpg";
import abies from "@/assets/photos/council/abies-sonia.jpg";

/**
 * The team's and the council's own portraits, supplied by the client on 26 Oct 2026 (see
 * docs/photo-credits.md), keyed by each profile's id. The team photos arrived without names and
 * the owner confirmed every match on 26 Oct 2026; the council photos were matched to the previous
 * site's named thumbnails.
 */
export const teamPortraits: Partial<Record<Profile["id"], { photo: StaticImageData; position?: string }>> = {
  bokun: { photo: bokun, position: "object-[50%_20%]" },
  oyindamola: { photo: oyindamola, position: "object-[50%_20%]" },
  "dk-jonah": { photo: dkJonah, position: "object-[50%_30%]" },
  yemi: { photo: yemi, position: "object-[50%_25%]" },
  "bella-abidakun": { photo: bella, position: "object-[50%_35%]" },
  "temi-fagbo": { photo: temi, position: "object-[50%_20%]" },
  "bukunmi-ladeji": { photo: bukunmi, position: "object-[50%_15%]" },
  "elizabeth-toluwani": { photo: elizabeth, position: "object-[50%_25%]" },
  "abies-sonia": { photo: abies, position: "object-[50%_25%]" },
};
