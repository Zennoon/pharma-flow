import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import React from "react";
import { headers } from "next/headers";
import ThemeToggle from "@/components/theme-toggle";

export default async function Page() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    redirect("/auth/login");
  }

  if (session.user.role === "USER") {
    redirect("/sales/dashboard");
  } else if (session.user.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  return (
    <div>
      <ThemeToggle />
    </div>
  );
}
