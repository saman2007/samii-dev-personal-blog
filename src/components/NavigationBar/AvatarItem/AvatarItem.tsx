"use client";

import Link from "@/components/Link/Link";
import { Avatar, AvatarImage } from "@/components/UI/Avatar/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/UI/DropDownMenu/DropDownMenu";
import { Skeleton } from "@/components/UI/Skeleton/Skeleton";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

export interface AvatarItemProps {
  isLoading?: boolean;
  avatarImg?: string | null;
}

const AvatarItem = ({ isLoading = false, avatarImg }: AvatarItemProps) => {
  if (isLoading)
    return (
      <Skeleton className="cursor-pointer h-10 rounded-full bg-block flex group w-20 justify-between items-center" />
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer h-10 rounded-full bg-block flex group w-20 justify-between items-center">
          <Avatar>
            <AvatarImage src={avatarImg ?? undefined} />
          </Avatar>
          <ChevronDown className="size-4 group-hover:scale-125 group-hover:text-green transition mr-1.5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile" className="flex items-center group">
            <User className="mr-2 h-4 w-4 text-text-secondary group-hover:text-semi-white" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings" className="flex items-center group">
            <Settings className="mr-2 h-4 w-4 text-text-secondary group-hover:text-semi-white" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red focus:text-red group">
          <LogOut className="mr-2 h-4 w-4 text-text-secondary group-hover:text-semi-white" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarItem;
