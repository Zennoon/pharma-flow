import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/generated/prisma";
import { Dispatch, SetStateAction } from "react";

export default function RoleSelectInput({
  setRole,
  className,
}: {
  setRole: Dispatch<SetStateAction<UserRole>>;
  className?: string;
}) {
  return (
    <Select
      name="role"
      onValueChange={(value) => {
        setRole(value as UserRole);
      }}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={UserRole.USER}>Sales</SelectItem>
        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
      </SelectContent>
    </Select>
  );
}
