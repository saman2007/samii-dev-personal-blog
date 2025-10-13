import { AnyRouteContext, ApiRouteFunction } from "@/types/types";
import { NextRequest } from "next/server";

export const withValidatedBody =
  <T extends object>(
    apiRoute: ApiRouteFunction<T>,
    validationCallback: (body: Record<string, any>) => { errors: string[] }
  ) =>
  async (req: NextRequest, ctx: AnyRouteContext): Promise<Response> => {
    if (req.headers.get("Content-Type") !== "application/json") {
      return Response.json(
        {
          error: "Invalid 'Content-Type' header. It must be 'application/json'",
          code: 400,
          data: null,
        },
        { status: 400 }
      );
    }

    const body: object = await req.json();

    const validationData = validationCallback(body);

    if (!validationData.errors.length) return apiRoute(req, ctx, body as T);
    else
      return Response.json(
        {
          data: null,
          code: 400,
          error: validationData.errors,
        },
        { status: 400 }
      );
  };
