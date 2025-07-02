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
  TrendingUp,
  Zap
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', active: location.pathname === '/' },
    { icon: BarChart3, label: 'LinkedIn Ads', path: '/linkedin-ads', active: location.pathname === '/linkedin-ads' },
    { icon: Users, label: 'WebID', path: '/webid', active: location.pathname === '/webid' },
    { icon: Zap, label: 'AI Co-Pilot', path: '/ai-chat', active: location.pathname === '/ai-chat', isAI: true },
    { icon: Target, label: 'Campaigns', path: '/campaigns', active: location.pathname === '/campaigns' },
    { icon: TrendingUp, label: 'Dashboards', path: '/dashboards', active: location.pathname === '/dashboards' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="px-6 border-b border-gray-200 flex items-center h-[69px]">
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
            
            // Special styling for AI Co-Pilot button
            if (item.isAI) {
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`
                      w-full justify-start relative overflow-hidden group
                      bg-transparent hover:bg-transparent
                      ${item.active 
                        ? 'text-purple-700' 
                        : 'text-gray-700 hover:text-purple-600'
                      }
                      transition-all duration-700 ease-out
                      border border-transparent rounded-md
                    `}
                    style={{
                      background: 'transparent',
                      borderImage: item.active 
                        ? 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4, #a855f7) 1'
                        : 'none'
                    }}
                  >
                    {/* Animated gradient border */}
                    <div className={`
                      absolute inset-0 rounded-md p-[1px] 
                      bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500
                      ${item.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                      transition-opacity duration-700
                    `}>
                      <div className="w-full h-full bg-white rounded-[calc(0.375rem-1px)]" />
                    </div>
                    
                    {/* Rotating gradient border animation */}
                    <div className={`
                      absolute inset-0 rounded-md
                      bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 via-purple-500
                      ${item.active ? 'animate-spin opacity-60' : 'opacity-0 group-hover:opacity-40 group-hover:animate-spin'}
                      transition-opacity duration-500
                    `} style={{
                      background: 'conic-gradient(from 0deg, #a855f7, #3b82f6, #06b6d4, #a855f7)',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      padding: '1px',
                      animationDuration: '3s'
                    }} />

                    <div className="relative z-10 flex items-center w-full">
                      <Icon className={`
                        w-4 h-4 mr-3 transition-all duration-700 ease-out
                        ${item.active 
                          ? 'text-purple-600 drop-shadow-lg filter brightness-125' 
                          : 'group-hover:text-purple-500 group-hover:drop-shadow-lg group-hover:filter group-hover:brightness-125 group-hover:scale-105'
                        }
                      `} />
                      <span className={`
                        font-medium transition-all duration-500
                        ${item.active ? 'text-purple-700' : 'group-hover:text-purple-600'}
                      `}>
                        {item.label}
                      </span>
                    </div>
                  </Button>
                </Link>
              );
            }
            
            // Regular buttons
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