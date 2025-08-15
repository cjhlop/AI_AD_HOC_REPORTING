import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Bell, ChevronDown, Filter, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-card border-b">
      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <Progress value={32} className="w-32" />
          <span className="text-sm text-muted-foreground">937/3000 Credits Used</span>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
          <Bell className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Ad Connections
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Connection 1</DropdownMenuItem>
            <DropdownMenuItem>Connection 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-9 h-9 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="Vasyl Admin" />
              <AvatarFallback>VA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Vasyl Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
            </Button>
            <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
            </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;