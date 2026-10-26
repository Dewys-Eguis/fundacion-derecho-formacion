"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

/**
 * Líneas onduladas del pie (Footer.dc.html: SVG de 1408 × 560 anclado arriba a la
 * izquierda) con deriva ambiental lenta. Solo se anima mientras el pie está visible.
 */
export function FooterWaves() {
  const svg = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap
          .timeline({ paused: true, repeat: -1, yoyo: true, defaults: { ease: "sine.inOut", duration: 9 } })
          .to(".ola-a", { x: -40, y: 14 }, 0)
          .to(".ola-b", { x: 30, y: -12 }, 0);
        ScrollTrigger.create({
          trigger: svg.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
        });
      });
      return () => mm.revert();
    },
    { scope: svg },
  );

  return (
    <svg
      ref={svg}
      aria-hidden
      width="1408"
      height="560"
      viewBox="0 0 1408 560"
      fill="none"
      className="pointer-events-none absolute top-0 left-0 max-w-none"
    >
      <path
        className="ola-a"
        d="M-20 420 C 300 300, 520 520, 860 380 S 1260 200, 1440 260"
        stroke="#F4914D"
        strokeOpacity=".55"
        strokeWidth="1.5"
      />
      <path
        className="ola-b"
        d="M-20 460 C 320 340, 560 560, 900 420 S 1280 240, 1440 310"
        stroke="#5FA3EE"
        strokeOpacity=".35"
      />
    </svg>
  );
}
