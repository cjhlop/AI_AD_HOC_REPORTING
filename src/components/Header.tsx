import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Bell, 
  Plus,
  ChevronDown
} from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search campaigns, visitors, insights..." 
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Right side - Actions and Profile */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-blue-100 text-blue-600">VM</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-gray-900">Vasyl M.</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;