"use client"
import { LucideIcon } from "lucide-react"


interface SidebarItemProps {
  icon: LucideIcon;
  label: String;
  href: String
}

export function SidebarItem({
  icon,
  label,
  href,
}: SidebarItemProps) {
  return (
    <div>SidebarItem ! </div>
  )
}

