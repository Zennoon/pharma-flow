"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setNewPasswordAction } from "@/actions/set-new-password-action";

export const SetPasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const  {error} = await setNewPasswordAction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("You have successfully set your password.");
      router.push("/");
    }
    setIsPending(false);
  }

  return (
    <form className="max-w-sm w-full space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">New Password</Label>
        <Input type="password" id="password" name="password" />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        Set Password
      </Button>
    </form>
  );
};
