"use server";

import { auth, ErrorCode } from "@/lib/auth";

export async function createUserAction(formData: FormData) {
    const email = String(formData.get("email"));
    const role = formData.get("role");
    const name = formData.get("name");
    const phoneNumber = formData.get("phoneNumber");

    console.log(email, role, name, phoneNumber);
    return { error: null };
}
