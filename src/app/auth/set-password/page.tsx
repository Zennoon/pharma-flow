import { SetPasswordForm } from "@/components/set-password-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  if (session.user.hasSetPassword) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Set Your Password</CardTitle>
              <CardDescription>
                A random password has been set for you. Please set a password for future logins.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SetPasswordForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
