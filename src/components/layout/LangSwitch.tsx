/**
 * Selector ES / EN tal como aparece en el diseño. La versión en inglés está
 * prevista pero sin traducir: EN no es un enlace y lo indica a lectores de pantalla.
 */
export function LangSwitch({
  className = "",
  activeClass = "text-white",
}: {
  className?: string;
  activeClass?: string;
}) {
  return (
    <span className={`font-semibold ${className}`}>
      <span aria-current="true" className={activeClass}>
        ES
      </span>{" "}
      <span aria-hidden className="opacity-50">
        /
      </span>{" "}
      <span lang="en" aria-disabled="true" title="Versión en inglés en preparación" className="cursor-help">
        EN<span className="sr-only"> (versión en inglés en preparación)</span>
      </span>
    </span>
  );
}
