import React from "react";
import { MenuNavigation } from "./general";
import { Toaster } from "@/components/ui/sonner";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <MenuNavigation children={children} />
      <Toaster position="top-right" />
    </>
  );
};

export default Layout;
