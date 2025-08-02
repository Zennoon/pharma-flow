import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface ReturnButtonProps {
  href: string;
  label: string;
}

export const ReturnButton = ({ href, label }: ReturnButtonProps) => {
  return (
    <Button className="sm" variant="outline" asChild>
      <Link href={href}>
        <ArrowLeftIcon />
        {label}
      </Link>
    </Button>
  );
};
