import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/generated/prisma";

export default function RoleSelectInput({
  className,
}: {
  className?: string;
}) {
  return (
    <Select
      name="role"
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
