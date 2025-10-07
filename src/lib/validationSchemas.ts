import z from "zod";

export const signinSchema = z.object({
  email: z.email().nonoptional(),
  password: z.string().min(1),
});

export type SigninData = z.infer<typeof signinSchema>;
