import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  Settings, 
  ChevronDown,
  ChevronLeft,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navigationSections = [
    {
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Zap, label: 'AI Co-Pilot', path: '/ai-chat', badge: 'Soon' },
      ]
    },
    {
      title: 'LINKEDIN ADS OPTIMIZATION',
      items: [
        { label: 'Ads Scheduling', path: '#' },
        { label: 'Frequency Cap', path: '#' },
        { label: 'Audience Tuning', path: '#' },
        { label: 'Budget Control', path: '#' },
        { label: 'Influenced Revenue', path: '/linkedin-ads' },
      ]
    },
    {
      title: 'AUDIENCES',
      items: [
        { label: 'Website Visitors', path: '/webid' },
        { label: 'Prospector', path: '#' },
        { label: 'Lists', path: '#', hasDropdown: true },
        { label: 'My Connections', path: '#' },
        { label: 'Uploaded', path: '#' },
      ]
    },
  ];

  const analyticsSection = {
    title: 'ANALYTICS',
    items: []
  };

  const bottomItems = [
    { icon: AlertCircle, label: 'Report Issue', path: '#' },
    { icon: Settings, label: 'Settings', path: '/settings', hasDropdown: true },
  ];

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed left-0 top-0">
      {/* Logo and collapse button */}
      <div className="px-4 border-b border-sidebar-border flex items-center justify-between h-[69px]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="text-xl font-bold text-white">DemandSense</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground hover:bg-slate-800 hover:text-white">
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
        {navigationSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1">{section.title}</h3>}
            <div className="space-y-1">
              {section.items?.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.label} to={item.path}>
                    <Button
                      className={`w-full justify-start text-sm font-medium h-10 px-3 ${
                        isActive 
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground hover:bg-orange-500/90' 
                          : 'bg-transparent text-sidebar-foreground hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {Icon && <Icon className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-sidebar-accent-foreground' : ''}`} />}
                      <span className="truncate">{item.label}</span>
                      {item.badge && <Badge variant="outline" className="ml-auto bg-white text-blue-600 hover:bg-white font-bold">{item.badge}</Badge>}
                      {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-auto flex-shrink-0" />}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        <Separator className="bg-sidebar-border my-4" />
         <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1">{analyticsSection.title}</h3>
            {/* Items for analytics would go here */}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-2 border-t border-sidebar-border">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} to={item.path}>
                <Button className="w-full justify-start text-sm font-medium h-10 px-3 bg-transparent text-sidebar-foreground hover:bg-slate-800 hover:text-white">
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-auto flex-shrink-0" />}
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