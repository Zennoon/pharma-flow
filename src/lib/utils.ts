import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidDomains() {
  const domains = ["gmail.com", "yahoo.com", "outlook.com"];

  if (process.env.NODE_ENV === "development") {
    domains.push("example.com");
  }

  return domains;
}

export function normalizeName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z\s'-]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getTitleFromUrl(parent: string, child?: string): string {
  const titleMap = {
    "/transactions": "Transactions",
    "/transactions/sale": "Register a New Sale",
    "/transactions/batch": "Register a New Arrival",
    "/analytics": "Analytics",
    "/analytics/sales": "Get Sales Analytics",
    "/analytics/inventory": "Get Inventory Analytics",
    "/personnel": "Personnel",
    "/personnel/new": "Register a New User",
  };

  return titleMap[
    `/${parent}${child ? `/${child}` : ""}` as keyof typeof titleMap
  ];
}
