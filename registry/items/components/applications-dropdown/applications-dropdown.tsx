"use client";

import { Grip, Image, ToolCase } from "lucide-react";
import { useState } from "react";

import { Button } from "../button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu";
import { UserAvatar } from "../user-avatar/user-avatar";

type ApplicationItem = {
  id: string;
  name: string;
  url: string;
  logoUrl?: string | null;
};

type ApplicationsDropdownUser = {
  name?: string;
  avatar?: string | null;
};

type ApplicationsDropdownProps = {
  systems?: ApplicationItem[];
  tools?: ApplicationItem[];
  isLoading?: boolean;
  accountUrl?: string;
  user?: ApplicationsDropdownUser;
};

function ApplicationsDropdown({
  systems = [],
  tools = [],
  isLoading = false,
  accountUrl = "#",
  user,
}: ApplicationsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasApps = systems.length > 0 || tools.length > 0;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="size-10 rounded-full p-1"
            aria-label="Apps da empresa"
          />
        }
      >
        <Grip className="size-5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-sm p-4" sideOffset={8}>
        <div className="mb-3">
          <h3 className="text-sm font-medium">CrediSIS CrediAri Apps</h3>
          <p className="text-xs text-muted-foreground">Seus apps corporativos em um só lugar</p>
        </div>

        {isLoading ? (
          <div className="p-6 text-center text-sm text-muted-foreground">Carregando apps...</div>
        ) : !hasApps ? (
          <div className="mt-4 flex flex-col p-8 text-center text-sm text-muted-foreground">
            <span className="mx-auto mb-3 flex rounded-full bg-muted p-2">
              <ToolCase className="size-7 text-muted-foreground" />
            </span>
            Os apps que você tiver acesso irão aparecer aqui...
          </div>
        ) : (
          <div className="max-h-80 space-y-4 overflow-y-auto pr-1">
            {systems.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                <a
                  className="flex h-20 flex-col items-center justify-center rounded-2xl p-3 transition-colors hover:bg-muted"
                  href={accountUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex flex-col items-center gap-1">
                    <UserAvatar
                      userimage={user?.avatar}
                      username={user?.name}
                      className="rounded-full"
                    />
                    <span className="text-center text-xs leading-tight font-medium">Conta</span>
                  </div>
                </a>

                {systems.map((app) => (
                  <DropdownMenuItem
                    key={app.id}
                    className="flex h-20 flex-col items-center justify-center overflow-hidden rounded-2xl p-3 transition-colors hover:bg-muted"
                    render={<a href={app.url} target="_blank" rel="noreferrer" />}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {app.logoUrl ? (
                        <img src={app.logoUrl} alt="" className="w-6" />
                      ) : (
                        <Image className="size-5" />
                      )}
                      <span className="line-clamp-2 text-center text-xs leading-tight font-medium">
                        {app.name}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            )}

            {tools.length > 0 && (
              <div>
                <p className="mb-2 px-1 text-xs font-semibold text-muted-foreground">Ferramentas</p>
                <div className="grid grid-cols-4 gap-2">
                  {tools.map((app) => (
                    <DropdownMenuItem
                      key={app.id}
                      className="flex h-20 flex-col items-center justify-center overflow-hidden rounded-2xl p-3 transition-colors hover:bg-muted"
                      render={<a href={app.url} target="_blank" rel="noreferrer" />}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {app.logoUrl ? (
                          <img src={app.logoUrl} alt="" className="w-6" />
                        ) : (
                          <Image className="size-5" />
                        )}
                        <span className="line-clamp-2 text-center text-xs leading-tight font-medium">
                          {app.name}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export {
  ApplicationsDropdown,
  type ApplicationItem,
  type ApplicationsDropdownProps,
  type ApplicationsDropdownUser,
};
