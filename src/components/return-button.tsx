import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface ReturnButtonProps {
  href: string;
  label: string;
  classname?: string;
}

export const ReturnButton = ({ href, label, classname }: ReturnButtonProps) => {
  return (
    <Button className={cn("sm", classname)} variant="outline" asChild>
      <Link href={href}>
        <ArrowLeftIcon />
        {label}
      </Link>
    </Button>
  );
};
