import AdminDashboardSidebar from "@/components/admin-dashboard-sidebar";
import DashboardNavigationBreadcrumb from "@/components/dashboard-navigation-breadcrumb";
import ThemeToggle from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/sales/dashboard");
  }

  return (
    <SidebarProvider>
      <AdminDashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <DashboardNavigationBreadcrumb />
            </div>
            <ThemeToggle classname="mr-2" />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
