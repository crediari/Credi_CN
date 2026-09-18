import type { HTMLAttributes } from "react";

type HelloCrediariProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

function HelloCrediari({
  label = "Hello Crediari",
  className,
  ...props
}: HelloCrediariProps) {
  return (
    <div
      data-slot="hello-crediari"
      className={[
        "inline-flex items-center gap-2 rounded-full border border-fuchsia-400/40 bg-fuchsia-600 px-4 py-2 text-sm font-semibold tracking-wide text-white shadow-[0_0_24px_rgba(192,38,211,0.45)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span aria-hidden="true">★</span>
      {label}
    </div>
  );
}

export { HelloCrediari, type HelloCrediariProps };
