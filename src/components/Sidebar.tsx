import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MessageSquare,
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  LifeBuoy,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'AI Co-Pilot', path: '/', icon: MessageSquare, active: true },
  ];

  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="text-lg font-semibold text-gray-900">DemandSense</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant={item.active ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                item.active 
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-100" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className="mr-3 w-5 h-5" />
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900">
            <Settings className="mr-3 w-5 h-5" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900">
            <LifeBuoy className="mr-3 w-5 h-5" />
            Support
          </Button>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Sofia Davis</p>
              <p className="text-xs text-gray-500">m.davis@example.com</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <LogOut className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;