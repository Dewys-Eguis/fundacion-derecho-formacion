"use client";

/** Registro único de GSAP para todo el sitio (solo en el cliente). */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.8 });
}

/** Consultas para gsap.matchMedia(): todo movimiento opcional va bajo MOTION_OK. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCED = "(prefers-reduced-motion: reduce)";
export const DESKTOP = "(min-width: 768px)";

export { gsap, ScrollTrigger, useGSAP };
