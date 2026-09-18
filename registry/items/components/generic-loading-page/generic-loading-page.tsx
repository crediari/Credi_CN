import { cn } from "@/lib/utils";

type GenericLoadingPageProps = {
  message?: string;
  className?: string;
  logoSrc?: string;
};

function GenericLoadingPage({
  message = "Carregando...",
  className,
  logoSrc = "/logo.svg",
}: GenericLoadingPageProps) {
  return (
    <div className={cn("mt-40 flex items-center justify-center gap-20", className)}>
      <div className="flex w-72 flex-col items-center justify-center overflow-hidden rounded-4xl">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-emerald-600" />
          <img
            src={logoSrc}
            alt="Logo"
            className="absolute inset-0 m-auto size-12 animate-pulse rounded-full object-contain"
          />
        </div>
        <p className="mt-7 text-sm font-semibold text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export { GenericLoadingPage, type GenericLoadingPageProps };
