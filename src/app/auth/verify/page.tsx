import { ReturnButton } from "@/components/return-button";
import { SendVerificationEmailForm } from "@/components/send-verification-email-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { error } = await searchParams;

  if (!error) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Verify Your Email</CardTitle>
              <CardDescription>
                <p className="text-destructive">
                  {error === "invalid_token" || error === "token_expired"
                    ? "Your token is invalid or expired. Please request a new one."
                    : error === "email_not_verified"
                      ? "Please verify your email, or request a new verification below"
                      : "Oops! Something went wrong. Please try aain."}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SendVerificationEmailForm />
              <ReturnButton href="/auth/login" label="Back to login" classname="w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
