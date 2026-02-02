import { Link } from "@tanstack/react-router"
import { LayoutDashboard,LogOut } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function Navbar() {
  return (
    <header className="h-16 w-full border-b bg-white px-9 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <span className="text-lg font-semibold tracking-tight text-neutral-900">
          WORK <span className="text-blue-600">TRACKER</span>
        </span>
      </div>
      <div className="flex flex-row space-x-20">
         <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-neutral-700 hover:text-blue-600 transition"
                activeProps={{
                  className: "text-blue-600 font-semibold",
                }}
              >
                Dashboard
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                to="/manage"
                className="text-sm font-medium text-neutral-700 hover:text-blue-600 transition"
                activeProps={{
                  className: "text-blue-600 font-semibold",
                }}
              >
                Manage
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full hover:bg-neutral-100 p-1 transition">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" alt="Ajay" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2 text-destructive">
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </header>
  )
}
