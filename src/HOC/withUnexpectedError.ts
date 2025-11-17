import { AnyRouteContext, ApiRouteFunction } from "@/types/types";
import { NextRequest } from "next/server";

export const withUnexpectedError =
  <T extends object>(apiRoute: ApiRouteFunction<T>) =>
  async (
    req: NextRequest,
    ctx: AnyRouteContext,
    data: object = {}
  ): Promise<Response> => {
    try {
      const res = await apiRoute(req, ctx, data as T);

      return res;
    } catch (e) {
      return Response.json(
        {
          data: null,
          code: 500,
          error: "An unexpected error happened! Error text: " + e,
        },
        { status: 500 }
      );
    }
  };
