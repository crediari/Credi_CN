import type { ButtonHTMLAttributes } from "react";

type TestButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

function TestButton({
  label = "Olá do registry",
  className,
  children,
  type = "button",
  ...props
}: TestButtonProps) {
  return (
    <button
      type={type}
      data-slot="test-button"
      className={[
        "inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_0_3px_rgba(16,185,129,0.25)] transition-colors hover:bg-emerald-500 disabled:pointer-events-none disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children ?? label}
    </button>
  );
}

export { TestButton, type TestButtonProps };
