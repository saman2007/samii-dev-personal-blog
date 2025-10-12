import { AnyRouteContext, ApiRouteFunction } from "@/types/types";
import { NextRequest } from "next/server";

export const withUnexpectedError =
  (apiRoute: ApiRouteFunction) =>
  async (req: NextRequest, ctx: AnyRouteContext): Promise<Response> => {
    try {
      const res = await apiRoute(req, ctx);

      return res;
    } catch (e) {
      return Response.json({
        data: null,
        code: 500,
        error: "An unexpected error happened! Error text: " + e,
      });
    }
  };
