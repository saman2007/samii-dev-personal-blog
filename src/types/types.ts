import { LocalesType } from "@/data/locales";
import { NextRequest } from "next/server";

export type Translation = Record<string, string>;

export type Translations = Record<string, Translation>;

export interface Params {
  locale: LocalesType[number];
  [key: string]: string | undefined;
}

export type LocalesTranslations = Record<LocalesType[number], Translations>;

export type Themes = ["light", "dark"];

export type DateArg = Date | string | number;

export interface YupErrorMessage {
  key: string;
  data: Record<string, number | string> | undefined;
}

export type UserRoles = "ADMIN" | "USER";

export type AnyRouteContext = { params: Promise<Record<string, string>> };

export type ApiRouteFunction<T extends object | null = null> = (
  request: NextRequest,
  ctx: AnyRouteContext,
  body?: T
) => Promise<Response>;
