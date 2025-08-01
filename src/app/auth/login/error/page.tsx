import { ReturnButton } from "@/components/return-button";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { error } = await searchParams;

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href='/auth/login' label='Login' />
        <h1 className="text-3xl font-bold">Login Error</h1>
      </div>

      <p className="text-destructive">
        {error === "account_not_linked"
          ? "This account is already linked to another sign-in method"
          : error === "signup_disabled"
            ? "You can't sign up without an admin. Please contact an admin to register."
            : "Oops! Something went wrong. Please try aain."}
      </p>
    </div>
  );
}
