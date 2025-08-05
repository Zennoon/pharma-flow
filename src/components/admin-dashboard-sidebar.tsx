"use client";

import * as React from "react";
import {
  BarChart3,
  BookOpen,
  Bot,
  Boxes,
  Columns3Cog,
  Command,
  FileUser,
  Frame,
  GalleryVerticalEnd,
  LifeBuoy,
  LineChart,
  Map,
  PackagePlus,
  PieChart,
  Pill,
  Send,
  Settings2,
  ShoppingCart,
  SquareTerminal,
  UserCog,
  UserPlus,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavProjects } from "./nav-projects";

export default function AdminDashboardSidebar() {
  const baseUrl = "/admin/dashboard";
  const pathname = usePathname();
  const data = {
    navMain: [
      {
        title: "Transactions",
        url: "#",
        icon: Pill,
        isActive: pathname.startsWith(`${baseUrl}/transactions`),
        items: [
          {
            title: "New Sale",
            url: `${baseUrl}/transactions/sale`,
            icon: ShoppingCart,
          },
          {
            title: "New Batch",
            url: `${baseUrl}/transactions/batch`,
            icon: PackagePlus,
          },
        ],
      },
      {
        title: "Analytics",
        url: "#",
        icon: PieChart,
        isActive: pathname.startsWith(`${baseUrl}/analytics`),
        items: [
          {
            title: "Sales",
            url: `${baseUrl}/analytics/sales`,
            icon: LineChart,
          },
          {
            title: "Inventory",
            url: `${baseUrl}/analytics/inventory`,
            icon: BarChart3,
          },
        ],
      },
      {
        title: "Personnel",
        url: "#",
        icon: FileUser,
        isActive: pathname.startsWith(`${baseUrl}/personnel`),
        items: [
          {
            title: "New",
            url: `${baseUrl}/personnel/new`,
            icon: UserPlus,
          },
          {
            title: "Manage",
            url: `${baseUrl}/personnel/manage`,
            icon: UserCog,
          },
        ],
      },
      {
        title: "Wholesalers",
        url: "#",
        icon: Boxes,
        isActive: pathname.startsWith(`${baseUrl}/wholesalers`),
        items: [
          {
            title: "New",
            url: `${baseUrl}/wholesalers/new`,
            icon: PackagePlus,
          },
          {
            title: "Manage",
            url: `${baseUrl}/wholesalers/manage`,
            icon: Columns3Cog,
          },
        ],
      },
      {
        title: "Settings",
        url: `${baseUrl}/settings`,
        icon: Settings2,
        items: []
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "/support",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "/feedback",
        icon: Send,
      },
    ],
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Pharmaflow</span>
                  <span className="truncate text-xs">Free</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
