
"use client";

import * as React from "react";
import {
  LayoutDashboard,
  PhoneCall,
  CalendarClock,
  User,
  Folder,
  ListChecks,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// ✅ Your Lucide-based nav config
const fullNavData = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Contact",
    url: "/contacts",
    icon: PhoneCall,
  },
  {
    title: "Meeting",
    url: "#",
    icon: CalendarClock,
    items: [
      { title: "All Meetings", url: "/meetings/all" },
      { title: "Calendar", url: "/meetings/calendar" },
      { title: "Scheduled", url: "/meetings/scheduled" },
    ],
  },
  {
    title: "Client",
    url: "/clients",
    icon: User,
  },
  {
    title: "Project",
    url: "/projects",
    icon: Folder,
  },
  {
    title: "Team",
    url: "/teams",
    icon: Users,
  },
  {
    title: "Task",
    url: "/tasks",
    icon: ListChecks,
  },
  {
    title: "Master",
    url: "#",
    icon: CalendarClock,
    items: [
      { title: "Service", url: "/masters/services" },
      { title: "Industry", url: "/masters/industry" },
      { title: "Meeting Slots", url: "/masters/slots" },
    ],
  },
];

const teams = [
  {
    name: "Acme Inc",
    logo: Users,
    plan: "Enterprise",
  },
  
];

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={fullNavData} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
