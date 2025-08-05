"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { getTitleFromUrl } from "@/lib/utils";

export default function DashboardNavigationBreadcrumb() {
  const pathname = usePathname();
  const [role, _, parent, current] = pathname.split("/").splice(1);
  const baseUrl = `/${role}/dashboard`;

  return (
    <Breadcrumb>
      {parent && current && (
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href={`${baseUrl}/${parent}`}>
              {getTitleFromUrl(parent)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{getTitleFromUrl(parent, current)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      )}
    </Breadcrumb>
  );
}
