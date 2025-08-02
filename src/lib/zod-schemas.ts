import z from "zod";

export const User = z.object({
  email: z.email(),
  password: z.string().min(6),
});
