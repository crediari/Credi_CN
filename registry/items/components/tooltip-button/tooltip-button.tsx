"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "../button/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip";

type TooltipButtonProps = ComponentPropsWithoutRef<typeof Button> & {
  children: ReactNode;
  tooltipContent: string;
};

function TooltipButton({
  children,
  tooltipContent,
  variant = "ghost",
  size = "icon",
  ...buttonProps
}: TooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button type="button" size={size} variant={variant} {...buttonProps} />}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}

export { TooltipButton, type TooltipButtonProps };
