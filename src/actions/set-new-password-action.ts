"use server";

import { auth } from "@/lib/auth";
import { PasswordSchema } from "@/lib/zod-schemas";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export async function setNewPasswordAction(formData: FormData) {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    const newPassword = String(formData.get("password"));
    if (!newPassword) return { error: "Please enter a password" };

    const validate = PasswordSchema.safeParse(newPassword);
    if (!validate.success) {
      return { error: validate.error.issues[0].message };
    }

    await auth.api.changePassword({
      body: {
        currentPassword: String(process.env.DEFAULT_PASSWORD),
        newPassword,
      },
      headers: headersList
    });

    await auth.api.updateUser({
      body: {
        hasSetPassword: true
      },
      headers: headersList
    })

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: "Internal Server Error" };
  }
}
