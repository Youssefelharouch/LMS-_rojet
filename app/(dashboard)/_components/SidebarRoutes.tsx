"use client"

import { Layout,Compass } from "lucide-react"
import { SidebarItem } from "./SidebarItem";

const guestRoutes = [
  {
    icon:Layout,
    label:"Dashboard",
    href:'/'
  },
  {
    icon:Compass,
    label:"Browse",
    href:'/'
  }
]
export function SidebarRoutes() {
  const routes = guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {
        routes.map((route)=>(
          <SidebarItem
          key={route.href}          
          icon={route.icon}
          href={route.href}
          label={route.label}
          />
        ))
      }
    </div>
  )
}

