import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar";
import { generateAvatarFallback } from "./generate-avatar-fallback";

type UserAvatarProps = {
  username: string | undefined;
  userimage: string | undefined | null;
  className?: string;
  textSize?: string;
  bgColor?: string;
};

function UserAvatar({ username, userimage, className, textSize, bgColor }: UserAvatarProps) {
  return (
    <Avatar className={cn(className ? className : "size-8 rounded-full")}>
      <AvatarFallback
        className={cn(
          "bg-linear-to-br from-emerald-300 via-emerald-800 to-emerald-900 font-semibold text-primary-foreground",
          bgColor,
          textSize,
        )}
      >
        <span className={textSize}>{generateAvatarFallback(username)}</span>
      </AvatarFallback>
      <AvatarImage src={userimage || undefined} className="object-cover" />
    </Avatar>
  );
}

export { UserAvatar, type UserAvatarProps };
