"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { PillGroup, tabPanelProps } from "@/components/ui/PillGroup";
import { Pending } from "@/components/ui/typography";
import { BOOKING_URL, CONTACT_PENDING } from "@/content/interior";
import { CONTACT_FORM, PRIVACY_POLICY, SITE, WHATSAPP_AGENDA } from "@/content/site";

type Tab = "escribanos" | "agenda" | "donaciones";
const TABS: { value: Tab; label: string }[] = [
  { value: "escribanos", label: "Escríbanos" },
  { value: "agenda", label: "Agenda tu cita" },
  { value: "donaciones", label: "Donaciones" },
];

type Errors = Partial<Record<"nombre" | "correo" | "mensaje" | "autorizacion", string>>;
type Status = "idle" | "sending" | "success" | "error";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Envíos más rápidos que esto desde que se abre el formulario se tratan como automáticos. */
const MIN_FILL_MS = 3000;

function validate(d: { nombre: string; correo: string; mensaje: string }, accepted: boolean): Errors {
  const e: Errors = {};
  if (d.nombre.trim().length < 2) e.nombre = "Escriba su nombre.";
  if (!EMAIL.test(d.correo.trim())) e.correo = "Escriba un correo electrónico válido.";
  if (d.mensaje.trim().length < 10) e.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  if (!accepted) e.autorizacion = "Debe autorizar el tratamiento de sus datos para enviar el mensaje.";
  return e;
}

/**
 * Panel de contacto (PDF pág. 17) con pestañas Escríbanos · Agenda tu cita · Donaciones.
 * La pestaña se elige también desde la URL (#escribanos, #agenda, #donaciones).
 *  · Formulario con validación accesible y envío real por Web3Forms (fetch, sin servidor propio).
 *    Solo confirma el envío si Web3Forms responde con éxito; si falla, conserva los datos y ofrece
 *    el envío por correo. Antispam: campo trampa «botcheck» y tiempo mínimo de llenado.
 *  · Citas: enlace al sistema de reservas que usa hoy el sitio.
 *  · Donaciones: pendiente de montos y pasarela (no se muestran montos ni pagos ficticios).
 */
export function ContactPanel() {
  const [tab, setTab] = useState<Tab>("escribanos");
  const [data, setData] = useState({ nombre: "", correo: "", mensaje: "" });
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const uid = useId();
  const root = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);
  const openedAt = useRef(0);

  useEffect(() => {
    if (tab === "escribanos") openedAt.current = Date.now();
  }, [tab]);

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
    if (status === "success" || status === "error") setStatus("idle");
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return; // evita envíos duplicados (doble clic o Enter repetido)
    const found = validate(data, accepted);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    // Bots: campo trampa marcado o envío instantáneo. No se envía nada ni se confirma nada.
    if (honeypot || Date.now() - openedAt.current < MIN_FILL_MS) {
      setStatus("error");
      return;
    }

    inFlight.current = true;
    setStatus("sending");
    try {
      // FormData = petición «simple» (sin preflight CORS), como en la documentación de Web3Forms.
      const body = new FormData();
      body.append("access_key", CONTACT_FORM.accessKey);
      body.append("subject", CONTACT_FORM.subject);
      body.append("from_name", CONTACT_FORM.fromName);
      body.append("name", data.nombre.trim());
      body.append("email", data.correo.trim());
      body.append("message", data.mensaje.trim());
      body.append("Autorizacion de datos personales", "Sí, aceptó la Política de Tratamiento de Datos Personales");
      const res = await fetch(CONTACT_FORM.endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });
      const json = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (res.ok && json?.success) {
        setStatus("success");
        setData({ nombre: "", correo: "", mensaje: "" });
        setAccepted(false);
        openedAt.current = Date.now();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
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

            {/* Campo trampa antispam de Web3Forms: invisible para personas y lectores de pantalla. */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            <div className="sm:col-span-2">
              <div className="flex items-start gap-3">
                <input
                  id={`${uid}-autorizacion`}
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => {
                    setAccepted(e.target.checked);
                    if (errors.autorizacion) setErrors((x) => ({ ...x, autorizacion: undefined }));
                  }}
                  aria-invalid={!!errors.autorizacion}
                  aria-describedby={errors.autorizacion ? `${uid}-autorizacion-err` : undefined}
                  required
                  className="mt-0.5 size-5 shrink-0 cursor-pointer accent-accion"
                />
                <label
                  htmlFor={`${uid}-autorizacion`}
                  className="cursor-pointer text-[14px] leading-[1.55] text-texto-cuerpo"
                >
                  He leído la{" "}
                  <a
                    href={PRIVACY_POLICY.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-accion underline underline-offset-2"
                  >
                    Política de Tratamiento de Datos Personales
                    <span className="sr-only"> (PDF, se abre en una pestaña nueva)</span>
                  </a>{" "}
                  y autorizo el tratamiento de mis datos para atender mi solicitud.
                </label>
              </div>
              {errors.autorizacion && (
                <p id={`${uid}-autorizacion-err`} className="mt-1.5 text-[13px] font-semibold text-naranja-texto">
                  {errors.autorizacion}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                aria-disabled={status === "sending"}
                className="h-13 w-full cursor-pointer rounded-pildora bg-azul text-[15px] font-extrabold text-white transition-colors duration-300 hover:bg-accion disabled:cursor-wait disabled:opacity-75 disabled:hover:bg-azul"
              >
                {status === "sending" ? "Enviando mensaje…" : "Enviar"}
              </button>
              <div aria-live="polite" role="status">
                {status === "success" && (
                  <div className="mt-4 animate-[aparecer_.3s_ease-out] rounded-2xl border border-accion/25 bg-bruma p-4 text-sm leading-[1.6] font-semibold text-azul motion-reduce:animate-none">
                    Tu mensaje ha sido enviado correctamente. Pronto nos pondremos en contacto contigo.
                  </div>
                )}
                {status === "error" && (
                  <div className="mt-4 animate-[aparecer_.3s_ease-out] rounded-2xl bg-durazno p-4 text-sm leading-[1.6] text-texto-cuerpo motion-reduce:animate-none">
                    <p className="font-semibold text-azul">
                      No pudimos enviar tu mensaje en este momento. Tus datos se conservan: puedes intentarlo de nuevo o
                      enviarlo desde tu programa de correo.
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
              Escríbanos por WhatsApp para agendar su cita, o reserve directamente en el calendario de la Fundación.
            </p>
            <ButtonLink href={WHATSAPP_AGENDA} arrow className="mt-6 mr-3">
              Agendar por WhatsApp
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </ButtonLink>
            <ButtonLink href={BOOKING_URL} variant="secondary" arrow className="mt-6">
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
