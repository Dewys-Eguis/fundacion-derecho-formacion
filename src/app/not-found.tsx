import { ButtonLink } from "@/components/ui/Button";
import { Accent, Eyebrow } from "@/components/ui/typography";
import { ROUTES } from "@/content/routes";

export default function NotFound() {
  return (
    <section className="contenedor flex min-h-[60vh] flex-col justify-center py-20 xl:px-16">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="mt-4 max-w-3xl text-h2">
        No encontramos esta <Accent>página.</Accent>
      </h1>
      <p className="mt-5 max-w-2xl text-lead text-texto-cuerpo">
        Es posible que la dirección haya cambiado o que la página aún esté en construcción.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={ROUTES.inicio} variant="dark" arrow>
          Ir al inicio
        </ButtonLink>
        <ButtonLink href={ROUTES.contacto} variant="secondary">
          Contáctenos
        </ButtonLink>
      </div>
    </section>
  );
}
