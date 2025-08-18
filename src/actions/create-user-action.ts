"use server";

import { UserRole } from "@/generated/prisma";
import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createUserAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter an email" };

  const role = String(formData.get("role"));
  if (!role) return { error: "Please select a role" };

  const name = String(formData.get("name"));
  if (!name) return { error: "Please enter a name" };

  const phoneNumber = formData.get("phoneNumber");

  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session) {
      throw new APIError("UNAUTHORIZED");
    }

    if (session.user.role !== "ADMIN") {
      throw new APIError("FORBIDDEN");
    }

    await auth.api.createUser({
      body: {
        email,
        name,
        password: String(process.env.DEFAULT_PASSWORD),
        role: role as UserRole,
        data: {
          phoneNumber,
        },
      },
    });

    await auth.api.sendVerificationEmail({
      body: {
        email,
        callbackURL: "/auth/verify"
      }
    });

    revalidatePath("/admin/dashboard/personnel/new");
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Oops! Something went wrong. Please try again." };
        default:
          return { error: err.message };
      }
    }

    return { error: "Internal Server Error" };
  }
}
