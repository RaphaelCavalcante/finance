"use client";
import {
  CreditCardIcon,
  LayoutDashboardIcon,
  ReceiptIcon,
  ReceiptText,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { Button } from "./ui/button";
import { APP_NAME } from "@/resources/constant";


// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Credit Cards",
    url: "/cards",
    icon: CreditCardIcon,
  },
  {
    title: "Bills",
    url: "/bills",
    icon: ReceiptIcon,
  },
  {
    title: "Receipts",
    url: "/receipts",
    icon: ReceiptText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const session = useSession();
  const hasSession = useMemo(() => {
    if (session.status == "authenticated") {
      return true;
    } else {
      return false;
    }
  }, [session]);
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{APP_NAME}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {hasSession && (
          <div className="flex flex-col justify-center gap-1">
            <Button className="flex justify-center"> Logout </Button>
            <span className="flex justify-center text-xs"> v 0.1</span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
