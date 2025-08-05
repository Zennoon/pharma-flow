"use client";

import { useState } from "react";

import { GalleryVerticalEnd } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import RoleSelectInput from "./role-select-input";
import { UserRole } from "@/generated/prisma";
import { createUserAction } from "@/actions/create-user-action";

export default function CreateUserForm() {
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [isPending, setIsPending] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsPending(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const { error } = await createUserAction(formData);
  }
  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">PharmaFlow</span>
            </Link>
            <h1 className="text-xl font-bold">Create a New User</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="+251*********"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="role">Role</Label>
              <RoleSelectInput setRole={setRole} className="w-full" />
            </div>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
