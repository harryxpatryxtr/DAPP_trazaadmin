"use client";

import * as React from "react";
import {
  AudioWaveform,
  Bot,
  Command,
  GalleryVerticalEnd,
  Home,
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
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const items = {
  user: {
    name: "Pedro Mollehuanca",
    email: "pedro.mollehuanca@umatechnology.io",
    avatar: "/avatars/shadcn.jpg"
  },
  teams: [
    { name: "Super Admin", logo: GalleryVerticalEnd, plan: "Enterprise" },
    { name: "Admin", logo: AudioWaveform, plan: "Startup" },
    { name: "User", logo: Command, plan: "Free" }
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
        { title: "Dominio", url: "/configuracion/dominio" },
        { title: "Tipo Usuario", url: "/configuracion/tipo-usuario" },
        { title: "Tipo Documento", url: "/configuracion/tipo-documento" },
        { title: "Tipo Cargo", url: "/configuracion/tipo-cargo" }
      ]
    },
    {
      title: "Administrador",
      url: "#",
      icon: SquareTerminal,
      items: [
        { title: "Permiso", url: "/permiso" },
        { title: "Rol", url: "/rol" },
        { title: "Usuario", url: "/usuario" }
      ]
    },
    {
      title: "REO",
      url: "#",
      icon: Bot,
      items: [{ title: "Empresa", url: "/empresa" }]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const [activeMenus, setActiveMenus] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const updatedMenus: { [key: string]: boolean } = {};

    items.navMain.forEach((item) => {
      if (item.items) {
        updatedMenus[item.title] = item.items.some((subItem) =>
          location.pathname.startsWith(subItem.url)
        );
      }
    });

    setActiveMenus(updatedMenus);
  }, [location.pathname]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={items.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={items.navMain}
          activeMenus={activeMenus}
          setActiveMenus={setActiveMenus}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={items.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
