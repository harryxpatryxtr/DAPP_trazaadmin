"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  PieChart,
  Settings2,
  SquareTerminal
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Pedro Mollehuanca",
    email: "pedro.mollehuanca@umatechnology.io",
    avatar: "/avatars/shadcn.jpg"
  },
  teams: [
    {
      name: "Super Admin",
      logo: GalleryVerticalEnd,
      plan: "Enterprise"
    },
    {
      name: "Admin",
      logo: AudioWaveform,
      plan: "Startup"
    },
    {
      name: "User",
      logo: Command,
      plan: "Free"
    }
  ],
  navMain: [
    {
      title: "Inicio",
      url: "/",
      icon: Home
    },
    {
      title: "Configuracion",
      url: "/configuracion",
      icon: Settings2,
      items: [
        {
          title: "Dominio",
          url: "/configuracion/dominio"
        },
        {
          title: "Tipo Usuario",
          url: "/configuracion/tipo-usuario"
        },
        {
          title: "Tipo Documento",
          url: "/configuracion/tipo-documento"
        },
        {
          title: "Tipo Cargo",
          url: "/configuracion/tipo-cargo"
        }
      ]
    },
    {
      title: "Administrador",
      url: "#",
      icon: SquareTerminal,
      isActive: true,

      items: [
        {
          title: "Permiso",
          url: "/permiso"
        },
        {
          title: "Rol",
          url: "/rol"
        },
        {
          title: "Usuario",
          url: "/usuario"
        }
      ]
    },
    {
      title: "REO",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Empresa",
          url: "/empresa"
        },
        {
          title: "Usuario",
          url: "/usuario"
        }
      ]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
