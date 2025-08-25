"use client";

import Link from "next/link";
import { Home, Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PageBreadcrumb() {
  return (
    <Breadcrumb className="bg-[#F2F2F2] py-4 px-6 flex items-center">
      <BreadcrumbList className="flex items-center text-sm text-muted-foreground font-roboto">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>/</BreadcrumbSeparator>

        <BreadcrumbItem>
          <span className="text-foreground font-medium">Products</span>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
