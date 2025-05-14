
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  PackageOpen, 
  Users, 
  UserCircle, 
  BarChart3, 
  Settings, 
  Menu,
  X
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="font-semibold text-lg">POS ERP System</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          <NavItem to="/" icon={<LayoutDashboard size={20} />} collapsed={collapsed}>
            Dashboard
          </NavItem>
          <NavItem to="/sales" icon={<ShoppingCart size={20} />} collapsed={collapsed}>
            Sales
          </NavItem>
          <NavItem to="/inventory" icon={<PackageOpen size={20} />} collapsed={collapsed}>
            Inventory
          </NavItem>
          <NavItem to="/customers" icon={<Users size={20} />} collapsed={collapsed}>
            Customers
          </NavItem>
          <NavItem to="/employees" icon={<UserCircle size={20} />} collapsed={collapsed}>
            Employees
          </NavItem>
          <NavItem to="/reports" icon={<BarChart3 size={20} />} collapsed={collapsed}>
            Reports
          </NavItem>
          <NavItem to="/settings" icon={<Settings size={20} />} collapsed={collapsed}>
            Settings
          </NavItem>
        </nav>
      </div>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  collapsed: boolean;
  children: React.ReactNode;
}

function NavItem({ to, icon, collapsed, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
          collapsed ? "justify-center" : ""
        )
      }
    >
      <div className="flex items-center">
        {icon}
        {!collapsed && <span className="ml-3">{children}</span>}
      </div>
    </NavLink>
  );
}
