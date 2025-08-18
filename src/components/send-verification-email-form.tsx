"use client";

import React, { useState } from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { sendVerificationEmail } from '@/lib/auth-client';

export const SendVerificationEmailForm = () => {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = String(formData.get('email'));

        if (!email) {
            return toast.error("Please enter your email.");
        }

        await sendVerificationEmail({
            email,
            callbackURL: "/auth/verify",
            fetchOptions: {
                onRequest: () => {
                    setIsPending(true);
                },
                onResponse: () => {
                    setIsPending(false);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: () => {
                    toast.success("Verification email sent successfully1");
                    router.push("/auth/verify/success");
                }
            }
        })
    }

    return (
        <form className="max-w-sm w-full space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <Label htmlFor='email'>Email</Label>
                <Input type='email' id='email' name='email' />
            </div>

            <Button className='w-full' type='submit' disabled={isPending}>
                Resend Verification Email
            </Button>
        </form>
    )
}
