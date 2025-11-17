import { withPrivateAPI } from "@/HOC/withPrivateAPI";
import { withUnexpectedError } from "@/HOC/withUnexpectedError";
import { UserPrivateInfo } from "@/types/types";

export const GET = withUnexpectedError(
  withPrivateAPI<{ user: UserPrivateInfo }>(
    async (_, __, { user }) => {
      return Response.json(
        { data: user, error: null, code: 200 },
        { status: 200 }
      );
    },
    false,
    true
  )
);
