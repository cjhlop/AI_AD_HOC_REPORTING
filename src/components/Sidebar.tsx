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
    { icon: MessageSquare, label: 'AI Co-Pilot', path: '/ai-chat', active: location.pathname === '/ai-chat', isAI: true },
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
                    variant={item.active ? "secondary" : "ghost"}
                    className={`
                      w-full justify-start relative overflow-hidden group
                      ${item.active 
                        ? 'bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 text-purple-700 border border-purple-200/50 shadow-lg shadow-purple-500/10' 
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-500/5 hover:via-blue-500/5 hover:to-cyan-500/5 hover:text-purple-600 hover:border-purple-200/30 hover:shadow-md hover:shadow-purple-500/5'
                      }
                      transition-all duration-500 ease-out
                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/20 before:via-blue-500/20 before:to-cyan-500/20 
                      before:opacity-0 before:transition-opacity before:duration-500
                      hover:before:opacity-100
                      after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full 
                      after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent
                      after:transition-all after:duration-700 after:ease-out
                      hover:after:left-[100%]
                    `}
                  >
                    <div className="relative z-10 flex items-center">
                      <Icon className={`
                        w-4 h-4 mr-3 transition-all duration-500
                        ${item.active 
                          ? 'text-purple-600 drop-shadow-sm animate-pulse' 
                          : 'group-hover:text-purple-500 group-hover:drop-shadow-sm group-hover:scale-110'
                        }
                      `} />
                      <span className={`
                        font-medium transition-all duration-300
                        ${item.active ? 'text-purple-700' : 'group-hover:text-purple-600'}
                      `}>
                        {item.label}
                      </span>
                      
                      {/* Magical sparkle effect */}
                      <div className={`
                        absolute -top-1 -right-1 w-2 h-2 rounded-full 
                        bg-gradient-to-r from-purple-400 to-cyan-400
                        ${item.active ? 'animate-ping opacity-75' : 'opacity-0 group-hover:opacity-75 group-hover:animate-ping'}
                        transition-opacity duration-300
                      `} />
                      
                      {/* Secondary sparkle */}
                      <div className={`
                        absolute top-1 right-2 w-1 h-1 rounded-full 
                        bg-gradient-to-r from-blue-400 to-purple-400
                        ${item.active ? 'animate-pulse opacity-60' : 'opacity-0 group-hover:opacity-60 group-hover:animate-pulse'}
                        transition-opacity duration-500 delay-150
                      `} />
                    </div>
                    
                    {/* Animated border glow */}
                    <div className={`
                      absolute inset-0 rounded-md border border-transparent
                      bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30
                      opacity-0 transition-opacity duration-500
                      ${item.active ? 'opacity-100' : 'group-hover:opacity-50'}
                    `} style={{
                      background: item.active 
                        ? 'linear-gradient(90deg, rgba(168,85,247,0.3) 0%, rgba(59,130,246,0.3) 50%, rgba(6,182,212,0.3) 100%)'
                        : undefined,
                      maskImage: 'linear-gradient(0deg, transparent, black 20%, black 80%, transparent)',
                      WebkitMaskImage: 'linear-gradient(0deg, transparent, black 20%, black 80%, transparent)'
                    }} />
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