"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { PillGroup, tabPanelProps } from "@/components/ui/PillGroup";
import { Pending } from "@/components/ui/typography";
import { BOOKING_URL, CONTACT_PENDING } from "@/content/interior";
import { SITE } from "@/content/site";

type Tab = "escribanos" | "agenda" | "donaciones";
const TABS: { value: Tab; label: string }[] = [
  { value: "escribanos", label: "Escríbanos" },
  { value: "agenda", label: "Agenda tu cita" },
  { value: "donaciones", label: "Donaciones" },
];

type Errors = Partial<Record<"nombre" | "correo" | "mensaje", string>>;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(d: { nombre: string; correo: string; mensaje: string }): Errors {
  const e: Errors = {};
  if (d.nombre.trim().length < 2) e.nombre = "Escriba su nombre.";
  if (!EMAIL.test(d.correo.trim())) e.correo = "Escriba un correo electrónico válido.";
  if (d.mensaje.trim().length < 10) e.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  return e;
}

/**
 * Panel de contacto (PDF pág. 17) con pestañas Escríbanos · Agenda tu cita · Donaciones.
 * La pestaña se elige también desde la URL (#escribanos, #agenda, #donaciones).
 *  · Formulario con validación accesible. No hay servicio de recepción conectado: en lugar
 *    de simular un envío, prepara el mensaje en el programa de correo del usuario.
 *  · Citas: enlace al sistema de reservas que usa hoy el sitio.
 *  · Donaciones: pendiente de montos y pasarela (no se muestran montos ni pagos ficticios).
 */
export function ContactPanel() {
  const [tab, setTab] = useState<Tab>("escribanos");
  const [data, setData] = useState({ nombre: "", correo: "", mensaje: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);
  const uid = useId();
  const root = useRef<HTMLDivElement>(null);

  // Sincronizar la pestaña con el ancla de la URL (enlaces «Donar» y «Agenda tu cita»).
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1) as Tab;
      if (TABS.some((t) => t.value === h)) {
        setTab(h);
        root.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const change = (k: keyof typeof data) => (e: { target: { value: string } }) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
    setReady(false);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      setReady(false);
      return;
    }
    setReady(true);
  };

  const mailto = `mailto:${SITE.email.label}?subject=${encodeURIComponent(`Mensaje de ${data.nombre.trim()} desde el sitio web`)}&body=${encodeURIComponent(
    `${data.mensaje.trim()}\n\n— ${data.nombre.trim()} (${data.correo.trim()})`,
  )}`;

  const field = (k: keyof typeof data, label: string, type = "text") => {
    const id = `${uid}-${k}`;
    const err = errors[k];
    const cls = `w-full rounded-2xl border bg-white px-4 text-[15px] text-azul transition-colors duration-200 focus:border-accion ${
      err ? "border-naranja-texto" : "border-linea"
    }`;
    return (
      <div className={k === "mensaje" ? "sm:col-span-2" : ""}>
        <label htmlFor={id} className="block text-sm font-bold">
          {label}
        </label>
        {k === "mensaje" ? (
          <textarea
            id={id}
            name={k}
            rows={5}
            value={data[k]}
            onChange={change(k)}
            aria-invalid={!!err}
            aria-describedby={err ? `${id}-err` : undefined}
            className={`${cls} mt-2 resize-y py-3`}
          />
        ) : (
          <input
            id={id}
            name={k}
            type={type}
            autoComplete={k === "correo" ? "email" : "name"}
            value={data[k]}
            onChange={change(k)}
            aria-invalid={!!err}
            aria-describedby={err ? `${id}-err` : undefined}
            className={`${cls} mt-2 h-12`}
          />
        )}
        {err && (
          <p id={`${id}-err`} className="mt-1.5 text-[13px] font-semibold text-naranja-texto">
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <div ref={root} className="scroll-mt-28 rounded-tarjeta border border-linea bg-white p-4 md:rounded-banda md:p-6">
      <PillGroup id="contacto" label="Opciones de contacto" items={TABS} value={tab} onChange={setTab} fill />

      <div key={tab} {...tabPanelProps("contacto", tab)} className="mt-6 animate-[aparecer_.35s_ease-out] px-1 pb-1">
        {tab === "escribanos" && (
          <form noValidate onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            {field("nombre", "Nombre")}
            {field("correo", "Correo electrónico", "email")}
            {field("mensaje", "Mensaje")}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="h-13 w-full cursor-pointer rounded-pildora bg-azul text-[15px] font-extrabold text-white transition-colors duration-300 hover:bg-accion"
              >
                Enviar
              </button>
              <div aria-live="polite">
                {ready && (
                  <div className="mt-4 rounded-2xl bg-durazno p-4 text-sm leading-[1.6] text-texto-cuerpo">
                    <p>
                      <Pending>{CONTACT_PENDING.form}</Pending>. Mientras tanto, puede enviar este mismo mensaje desde
                      su programa de correo:
                    </p>
                    <a
                      href={mailto}
                      className="mt-3 inline-flex h-11 items-center rounded-pildora bg-naranja px-5 text-sm font-extrabold text-azul no-underline"
                    >
                      Enviar por correo electrónico
                    </a>
                  </div>
                )}
              </div>
            </div>
          </form>
        )}

        {tab === "agenda" && (
          <div className="rounded-3xl bg-bruma p-6 md:p-8">
            <h3 className="text-2xl font-extrabold">Agende su cita de asesoría o conciliación</h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-texto-cuerpo">
              Las citas se gestionan en el calendario de reservas de la Fundación.
            </p>
            <ButtonLink href={BOOKING_URL} arrow className="mt-6">
              Abrir el calendario de citas
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </ButtonLink>
            <p className="mt-4 text-[13px] text-texto-2">
              También puede llamar al{" "}
              <a href={SITE.phone.href} className="font-bold text-accion">
                {SITE.phone.label}
              </a>
              .
            </p>
          </div>
        )}

        {tab === "donaciones" && (
          <div className="rounded-3xl bg-durazno p-6 md:p-8">
            <h3 className="text-2xl font-extrabold">Apoye la labor de la Fundación</h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-texto-cuerpo">
              <Pending>{CONTACT_PENDING.donations}</Pending>.
            </p>
            <p className="mt-3 text-[15px] leading-[1.6] text-texto-cuerpo">
              Si desea apoyar a la Fundación, escríbanos y le indicaremos cómo hacerlo.
            </p>
            <ButtonLink href={SITE.email.href} variant="dark" className="mt-6">
              Escribir a {SITE.email.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}
