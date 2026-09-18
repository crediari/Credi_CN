"use client";

import { AuthLoading } from "./auth-loading";

export function Preview() {
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-xl border">
      <AuthLoading
        isLoading
        message="Autenticando..."
        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background"
      />
    </div>
  );
}
