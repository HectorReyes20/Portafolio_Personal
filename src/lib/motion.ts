"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

let pluginsRegistered = false;

export function registerGsapPlugins(): void {
  if (typeof window === "undefined" || pluginsRegistered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  pluginsRegistered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export const PRELOADER_DONE_EVENT = "sr:preloader-done";

let preloaderDoneState = false;

export function isPreloaderDone(): boolean {
  return preloaderDoneState;
}

export function markPreloaderDone(): void {
  if (preloaderDoneState) return;
  preloaderDoneState = true;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
  }
}
