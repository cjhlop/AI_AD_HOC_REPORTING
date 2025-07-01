import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Settings, 
  HelpCircle,
  ChevronDown,
  Building2,
  Target,
  TrendingUp
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', active: location.pathname === '/' },
    { icon: BarChart3, label: 'LinkedIn Ads', path: '/linkedin-ads', active: location.pathname === '/linkedin-ads' },
    { icon: Users, label: 'WebID', path: '/webid', active: location.pathname === '/webid' },
    { icon: MessageSquare, label: 'AI Chat', path: '/ai-chat', active: location.pathname === '/ai-chat' },
    { icon: Target, label: 'Campaigns', path: '/campaigns', active: location.pathname === '/campaigns' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics', active: location.pathname === '/analytics' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DS</span>
          </div>
          <span className="text-xl font-bold text-gray-900">DemandSense</span>
        </div>
      </div>

      {/* Workspace Selector */}
      <div className="p-4 border-b border-gray-200">
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center">
            <Building2 className="w-4 h-4 mr-2" />
            <span className="text-sm">Acme Corp</span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={item.active ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    item.active 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;