import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

/** The theme's `--ease-standard` (a quick start that settles slowly), so GSAP and CSS decelerate the same way. */
export const ease = CustomEase.create("standard", "0.2,0,0,1");
