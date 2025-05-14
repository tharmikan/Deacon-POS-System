
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Moon, Search, Sun, User } from "lucide-react";

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export function Header({ toggleTheme, isDarkMode }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="flex h-16 items-center px-4 border-b bg-background/95 backdrop-blur">
      {searchOpen ? (
        <div className="flex-1 flex items-center">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full max-w-sm"
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => setSearchOpen(false)}
          >
            <X width={20} height={20} />
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="mr-2"
          >
            <Search size={20} />
          </Button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

// Custom X SVG component that properly handles width and height props instead of size
function X({ width = 24, height = 24, ...props }: React.SVGProps<SVGSVGElement> & { width?: number; height?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
