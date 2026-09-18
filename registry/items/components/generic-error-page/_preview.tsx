"use client";

import { GenericErrorPage } from "./generic-error-page";

export function Preview() {
  return (
    <div className="w-full scale-75">
      <GenericErrorPage
        title="Página não encontrada"
        description="O endereço pode ter mudado ou o recurso foi removido."
        buttons={[
          { label: "Voltar ao início", url: "#", variant: "default" },
          { label: "Suporte", url: "#", variant: "outline" },
        ]}
      />
    </div>
  );
}
