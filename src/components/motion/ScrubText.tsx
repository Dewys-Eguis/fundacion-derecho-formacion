"use client";

import { Fragment, useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

export type ScrubSegment = { text: string; className?: string };

/**
 * Texto que se «enciende» palabra a palabra al avanzar el scroll (manifiesto).
 * Cada tramo conserva su color del diseño; solo se anima la opacidad, y el
 * estado final es exactamente el del diseño. Lectores de pantalla: texto íntegro.
 */
export function ScrubText({ segments, className = "" }: { segments: ScrubSegment[]; className?: string }) {
  const el = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".scrub-word",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: { trigger: el.current, start: "top 82%", end: "bottom 48%", scrub: 0.5 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: el },
  );

  return (
    <p ref={el} className={className}>
      {segments.map((s, i) => (
        <Fragment key={i}>
          <span className={s.className}>
            {s.text.split(/(\s+)/).map((w, j) =>
              /^\s+$/.test(w) ? (
                w
              ) : w ? (
                <span key={j} className="scrub-word">
                  {w}
                </span>
              ) : null,
            )}
          </span>
          {i < segments.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  );
}
