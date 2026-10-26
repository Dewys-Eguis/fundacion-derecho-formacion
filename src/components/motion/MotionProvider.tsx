"use client";

import { usePathname } from "next/navigation";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "./gsap";

/**
 * Animaciones de aparición globales: cualquier elemento con `data-reveal`
 * entra con fade-up de 24 px y escalonado de 80 ms (handoff · movimiento).
 * Los componentes de servidor solo añaden el atributo; no necesitan JS propio.
 * Con prefers-reduced-motion el CSS no oculta nada y aquí no se anima.
 */
export function MotionProvider() {
  const pathname = usePathname();

  useGSAP(
    () => {
      document.documentElement.dataset.motion = "ready";
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, overwrite: true }),
        });

        // [data-draw]: trazos SVG decorativos que se dibujan al entrar en pantalla.
        gsap.utils.toArray<SVGPathElement>("path[data-draw]").forEach((path) => {
          path.setAttribute("pathLength", "1");
          gsap.fromTo(
            path,
            { strokeDasharray: "1 1", strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: 1.8,
              ease: "power2.inOut",
              scrollTrigger: { trigger: path.ownerSVGElement ?? path, start: "top 85%", once: true },
            },
          );
        });

        // [data-float="px"]: decoración con flotación ambiental leve (vuelve siempre a su sitio).
        gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
          const amp = Number(el.dataset.float) || 6;
          gsap.to(el, { y: amp, duration: 5 + (i % 3), ease: "sine.inOut", repeat: -1, yoyo: true });
        });
      });
      // Las imágenes y fuentes cambian alturas: recalcular posiciones al terminar de cargar.
      // Si la carga ya terminó (navegación rápida o caché), se recalcula en el siguiente cuadro.
      const refresh = () => ScrollTrigger.refresh();
      let raf = 0;
      if (document.readyState === "complete") raf = requestAnimationFrame(refresh);
      else window.addEventListener("load", refresh, { once: true });
      document.fonts?.ready.then(refresh);

      // Enlaces con ancla (p. ej. /quienes-somos/#mision-vision): llevar a la sección una vez
      // que la página está montada y medida.
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const target = hash ? document.getElementById(hash) : null;
      if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
