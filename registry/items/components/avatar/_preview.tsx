"use client";

import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount } from "./avatar";

export function Preview() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          <AvatarFallback>JA</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
      </div>
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
