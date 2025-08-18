import z from "zod";

export const User = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const PasswordSchema = z
  .string()
  .min(6, "Password must at least be 8 characters long")
  .max(100, "Password must be less than 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );
