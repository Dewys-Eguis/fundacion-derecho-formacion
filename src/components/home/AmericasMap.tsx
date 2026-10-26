"use client";

import { useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { FOCUS } from "@/content/home";
import { AMERICAS_DOTS, AMERICAS_DOTS_MOBILE, ARC_PATH, CIUDAD_BOLIVAR, WASHINGTON } from "@/content/map";

/**
 * Mapa vectorial de puntos de las Américas con el recorrido Washington → Ciudad Bolívar
 * sobre fondo azul institucional limpio (PDF pág. 1 / pág. 4). Al entrar en pantalla:
 * aparecen los puntos y Washington, se dibuja el arco discontinuo, llega a Ciudad Bolívar
 * y aparecen las etiquetas. Después: el trazo avanza y los halos laten suavemente.
 * Pasar el cursor (o el foco) por una etiqueta resalta su punto.
 * Sin movimiento (prefers-reduced-motion) todo se muestra en su estado final.
 */
export function AmericasMap({ variant = "desktop", id }: { variant?: "desktop" | "mobile"; id: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<"wa" | "cb" | null>(null);
  const desktop = variant === "desktop";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
          defaults: { ease: "power3.out" },
        });
        tl.from(".map-dots", { opacity: 0, scale: 0.95, transformOrigin: "50% 40%", duration: 1.1 })
          .from(".pt-wa", { scale: 0, transformOrigin: "center", duration: 0.5, ease: "back.out(2.4)" }, "-=0.5")
          .from(".lbl-wa", { opacity: 0, y: 10, duration: 0.5 }, "<0.1")
          .fromTo(".arc-mask", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" })
          .from(".pt-cb", { scale: 0, transformOrigin: "center", duration: 0.55, ease: "back.out(2.4)" }, "-=0.25")
          .from(".lbl-cb", { opacity: 0, y: 10, duration: 0.5 }, "<0.1")
          .add(() => {
            gsap.to(".arc-dash", { strokeDashoffset: -26, duration: 1.4, ease: "none", repeat: -1 });
            gsap.to(".halo", {
              scale: 1.45,
              opacity: 0,
              transformOrigin: "center",
              duration: 2.4,
              ease: "sine.out",
              repeat: -1,
              stagger: 0.7,
            });
          });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const hl = (k: "wa" | "cb") => (focus === k ? "scale-[1.35]" : "scale-100");
  const labelEvents = (k: "wa" | "cb") => ({
    tabIndex: 0,
    onPointerEnter: () => setFocus(k),
    onPointerLeave: () => setFocus(null),
    onFocus: () => setFocus(k),
    onBlur: () => setFocus(null),
  });
  const { origin, destination } = FOCUS.labels;

  return (
    <div ref={root} className="relative h-full w-full">
      <svg
        aria-hidden
        viewBox={desktop ? "-40 -20 560 640" : "140 40 300 300"}
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
      >
        <defs>
          <marker
            id={`${id}-arrow`}
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill="#F4914D" />
          </marker>
          <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="-40" y="-20" width="600" height="700">
            <path
              className="arc-mask"
              d={ARC_PATH}
              stroke="white"
              strokeWidth="34"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={0}
            />
          </mask>
        </defs>
        <path
          className="map-dots"
          d={desktop ? AMERICAS_DOTS : AMERICAS_DOTS_MOBILE}
          stroke="#5FA3EE"
          strokeOpacity=".45"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <g mask={`url(#${id}-mask)`}>
          <path
            className="arc-dash"
            d={ARC_PATH}
            stroke="#F4914D"
            strokeWidth="2.5"
            strokeDasharray="6 7"
            markerEnd={`url(#${id}-arrow)`}
          />
        </g>
        <g className="pt-wa">
          <g className={`origin-center transition-transform duration-300 [transform-box:fill-box] ${hl("wa")}`}>
            <circle className="halo" cx={WASHINGTON.x} cy={WASHINGTON.y} r="22" fill="#FFFFFF" fillOpacity=".22" />
            <circle cx={WASHINGTON.x} cy={WASHINGTON.y} r="8" fill="#FFFFFF" />
          </g>
        </g>
        <g className="pt-cb">
          <g className={`origin-center transition-transform duration-300 [transform-box:fill-box] ${hl("cb")}`}>
            <circle
              className="halo"
              cx={CIUDAD_BOLIVAR.x}
              cy={CIUDAD_BOLIVAR.y}
              r="22"
              fill="#F4914D"
              fillOpacity=".3"
            />
            <circle cx={CIUDAD_BOLIVAR.x} cy={CIUDAD_BOLIVAR.y} r="8" fill="#F4914D" />
          </g>
        </g>
      </svg>

      {/* Etiquetas (posiciones del PDF convertidas a % de la caja del mapa) */}
      <p
        {...labelEvents("wa")}
        className={`lbl-wa absolute rounded-xl bg-white whitespace-nowrap text-azul shadow-flotante outline-offset-2 transition-transform duration-300 hover:-translate-y-0.5 ${
          desktop
            ? "top-[10.3%] left-[68.8%] px-4 py-2.5 text-[13.5px] leading-[1.3]"
            : "top-[3%] left-[48%] px-3 py-2 text-xs leading-[1.3]"
        }`}
      >
        <b className="block font-extrabold">{origin.title}</b>
        <span className="text-texto-2">{origin.sub}</span>
      </p>
      <p
        {...labelEvents("cb")}
        className={`lbl-cb absolute rounded-xl bg-naranja whitespace-nowrap text-azul shadow-flotante outline-offset-2 transition-transform duration-300 hover:-translate-y-0.5 ${
          desktop
            ? "top-[48.7%] left-[87%] px-4 py-2.5 text-[13.5px] leading-[1.3]"
            : "top-[64%] left-[52%] px-3 py-2 text-xs leading-[1.3]"
        }`}
      >
        <b className="block font-extrabold">{destination.title}</b>
        <span>{destination.sub}</span>
      </p>
    </div>
  );
}
