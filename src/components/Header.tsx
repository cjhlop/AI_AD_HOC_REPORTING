import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  ChevronDown,
  User
} from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 h-[69px] flex items-center justify-end">
      {/* Right side - Actions and Profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500"></Badge>
        </Button>

        {/* Profile */}
        <Button variant="ghost" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <span className="text-sm font-medium">John Doe</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;