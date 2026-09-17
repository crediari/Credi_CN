import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type TestButtonProps = ComponentProps<typeof Button> & {
  label?: string;
};

function TestButton({
  label = "Olá do registry",
  children,
  ...props
}: TestButtonProps) {
  return (
    <Button data-slot="test-button" {...props}>
      {children ?? label}
    </Button>
  );
}

export { TestButton, type TestButtonProps };
