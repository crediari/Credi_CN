"use client";

import { Laptop, LogOut, Moon, Sun } from "lucide-react";
import { useState } from "react";

import { Button } from "../button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip";
import { UserAvatar } from "../user-avatar/user-avatar";

type UserMenuTheme = "light" | "dark" | "system";

type UserMenuUser = {
  name?: string;
  email?: string;
  avatar?: string | null;
};

type UserMenuProps = {
  user?: UserMenuUser;
  theme?: UserMenuTheme;
  onThemeChange?: (theme: UserMenuTheme) => void;
  onLogout?: () => void;
};

function truncateName(name: string | null | undefined): string {
  if (!name) {
    return "";
  }

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0];
  }

  return `${parts[0]} ${parts[parts.length - 1]}`;
}

function nextTheme(theme: UserMenuTheme): UserMenuTheme {
  if (theme === "system") {
    return "dark";
  }

  if (theme === "dark") {
    return "light";
  }

  return "system";
}

function UserMenu({ user, theme: themeProp, onThemeChange, onLogout }: UserMenuProps) {
  const [uncontrolledTheme, setUncontrolledTheme] = useState<UserMenuTheme>("system");
  const theme = themeProp ?? uncontrolledTheme;
  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Laptop;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="group flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-muted"
          />
        }
      >
        <UserAvatar
          userimage={user?.avatar}
          username={user?.name}
          className="size-10 select-none group-hover:opacity-80"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-56 overflow-hidden p-0" side="bottom">
        <div className="h-24 overflow-hidden rounded-t-3xl border-b-2 border-b-emerald-800 bg-linear-to-br from-emerald-400 via-emerald-800 to-emerald-950" />

        <UserAvatar
          userimage={user?.avatar}
          username={user?.name}
          className="mx-auto -mt-10 size-20 border-2 border-emerald-800"
          textSize="text-2xl"
        />

        <div className="px-2">
          <p className="mx-auto mt-1 max-w-56 truncate text-center font-semibold">
            {truncateName(user?.name)}
          </p>
          <p className="mx-auto max-w-48 truncate text-center text-xs text-muted-foreground">
            {user?.email}
          </p>

          <div className="mt-5 flex items-center justify-center gap-2">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    size="icon"
                    className="rounded-full"
                    onClick={() => {
                      const next = nextTheme(theme);
                      setUncontrolledTheme(next);
                      onThemeChange?.(next);
                    }}
                  />
                }
              >
                <ThemeIcon />
              </TooltipTrigger>
              <TooltipContent>Mudar tema</TooltipContent>
            </Tooltip>
          </div>

          <div className="my-5 flex items-center justify-center">
            <Button variant="destructive" onClick={onLogout}>
              <span>Fazer logout</span>
              <LogOut />
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserMenu, type UserMenuProps, type UserMenuTheme, type UserMenuUser };
