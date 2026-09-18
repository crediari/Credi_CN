import { SearchX } from "lucide-react";

import { Button } from "../button/button";

type ErrorPageButton = {
  label: string;
  url: string;
  variant: "outline" | "default";
};

type GenericErrorPageProps = {
  title: string;
  description: string;
  buttons?: ErrorPageButton[];
};

function GenericErrorPage({ title, description, buttons }: GenericErrorPageProps) {
  return (
    <div className="flex min-h-full items-center justify-center gap-20">
      <div className="text-center">
        <div className="mb-8">
          <div className="relative mx-auto h-64 w-64">
            <svg
              className="h-full w-full text-muted-foreground/20"
              viewBox="0 0 200 200"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M84 144V156H116V144H84Z" />
              <path d="M84 44V116H116V44H84Z" />
              <path d="M100 10C149.706 10 190 50.294 190 100C190 149.706 149.706 190 100 190C50.294 190 10 149.706 10 100C10 50.294 50.294 10 100 10ZM100 2C45.8172 2 2 45.8172 2 100C2 154.183 45.8172 198 100 198C154.183 198 198 154.183 198 100C198 45.8172 154.183 2 100 2Z" />
            </svg>
            <SearchX className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-primary" />
          </div>
        </div>

        <div className="max-w-xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ocorreu um erro :(</h1>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            {buttons?.map((button) => (
              <Button key={button.url} variant={button.variant} render={<a href={button.url} />}>
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { GenericErrorPage, type GenericErrorPageProps };
