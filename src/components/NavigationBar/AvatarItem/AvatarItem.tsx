"use client";

import { signOutAPI } from "@/api/auth";
import Link from "@/components/Link/Link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/UI/Avatar/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/UI/DropDownMenu/DropDownMenu";
import { Skeleton } from "@/components/UI/Skeleton/Skeleton";
import { Spinner } from "@/components/UI/Spinner/Spinner";
import { useSetStore } from "@/contexts/storeContext";
import { useRequest } from "@/hooks/useRequest";
import { getTranslations } from "@/lib/translation";
import { Params } from "@/types/types";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useParams } from "next/navigation";
import { MouseEventHandler } from "react";
import { toast } from "sonner";

export interface AvatarItemProps {
  isLoading?: boolean;
  avatarImg?: string | null;
  fallbackWord?: string;
}

const AvatarItem = ({
  isLoading = false,
  avatarImg,
  fallbackWord,
}: AvatarItemProps) => {
  const setStore = useSetStore();
  const { execute: signOut, isLoading: isSigningOut } = useRequest(signOutAPI);
  const params = useParams<Params>();

  const { t } = getTranslations(["auth", "common"], params);

  if (isLoading)
    return (
      <Skeleton className="cursor-pointer h-10 rounded-full bg-block flex group w-20 justify-between m-auto sm:m-0 items-center" />
    );

  const onSignOutHandler: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await signOut();

    setStore({ auth: { isLoading: false, user: null, isLoggedIn: false } });

    toast.success(t("auth.signed_out_success"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer h-10 rounded-full bg-block flex group m-auto sm:m-0 w-20 justify-between items-center">
          <Avatar>
            <AvatarImage src={avatarImg ?? undefined} />
            <AvatarFallback>{fallbackWord}</AvatarFallback>
          </Avatar>
          <ChevronDown className="size-4 group-hover:scale-125 group-hover:text-green transition mr-1.5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild className="cursor-pointer transition-colors">
          <Link href="/profile" className="flex items-center group">
            <User className="mr-2 h-4 w-4 text-text-secondary group-hover:text-semi-white transition-colors" />
            <span>{t("common.profile")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer transition-colors">
          <Link href="/settings" className="flex items-center group">
            <Settings className="mr-2 h-4 w-4 text-text-secondary group-hover:text-semi-white transition-colors" />
            <span>{t("common.settings")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red focus:text-red group transition-colors"
          onClick={onSignOutHandler}
        >
          {isSigningOut ? (
            <Spinner className="size-5 m-auto text-text-secondary group-hover:text-semi-white transition-colors" />
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4 text-text-secondary group-hover:text-semi-white transition-colors" />
              <span>{t("common.sign_out")}</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarItem;
