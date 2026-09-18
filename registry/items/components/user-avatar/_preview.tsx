"use client";

import { UserAvatar } from "./user-avatar";

export function Preview() {
  return (
    <div className="flex items-center gap-3">
      <UserAvatar username="Ana Costa" userimage={null} />
      <UserAvatar username="João" userimage={null} className="size-10 rounded-full" />
      <UserAvatar
        username="Maria Silva"
        userimage={null}
        className="size-12 rounded-full"
        textSize="text-lg"
      />
    </div>
  );
}
