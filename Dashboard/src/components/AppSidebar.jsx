import {
  LayoutDashboard,
  PackagePlus,
  Boxes,
  Search,
  LogOut,
  BarChart3,
  UserPlus
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Create Parcel", url: "/create-parcel", icon: PackagePlus },
  { title: "Manage Parcels", url: "/manage-parcels", icon: Boxes },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Parcel Tracking", url: "/tracking", icon: Search },
];
export function AppSidebar() {
  return <></>;
}
