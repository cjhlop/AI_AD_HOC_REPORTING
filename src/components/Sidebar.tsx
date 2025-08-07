import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Logo } from '@/components/Logo';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Settings, 
  LifeBuoy,
  ChevronLeft,
  Target,
  TrendingUp
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Home' },
  { path: '/ai-chat', icon: MessageSquare, label: 'AI Co-Pilot' },
  { path: '/dashboards', icon: TrendingUp, label: 'Dashboards' },
  { path: '/linkedin-ads', icon: BarChart3, label: 'LinkedIn Ads' },
  { path: '/webid', icon: Users, label: 'WebID' },
  { path: '/campaigns', icon: Target, label: 'Campaigns' },
];

const bottomNavItems = [
  { path: '/settings', icon: Settings, label: 'Settings' },
  { path: '/help', icon: LifeBuoy, label: 'Help' },
];

const Sidebar = () => {
  const { isCollapsed, toggle } = useSidebar();
  const location = useLocation();

  const NavLink = ({ item }: { item: { path: string; icon: React.ElementType; label: string } }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

    if (isCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to={item.path}>
              <Button variant={isActive ? 'secondary' : 'ghost'} size="icon" className="w-full">
                <Icon className="h-5 w-5" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      );
    }

    return (
      <Link to={item.path}>
        <Button variant={isActive ? 'secondary' : 'ghost'} className="w-full justify-start">
          <Icon className="mr-3 h-5 w-5" />
          {item.label}
        </Button>
      </Link>
    );
  };

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        "hidden md:flex flex-col h-full bg-card border-r relative",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className={cn("flex items-center p-4", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && <span className="text-lg font-bold">DemandSense</span>}
        <Logo />
      </div>
      
      <nav className="flex-1 flex flex-col gap-y-2 px-4 py-8">
        {navItems.map(item => <NavLink key={item.path} item={item} />)}
      </nav>

      <div className="mt-auto flex flex-col gap-y-2 px-4 pb-4">
        {bottomNavItems.map(item => <NavLink key={item.path} item={item} />)}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-1/2 -translate-y-1/2 bg-card border rounded-full h-8 w-8 hover:bg-muted"
        onClick={toggle}
      >
        <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
      </Button>
    </motion.div>
  );
};

export default Sidebar;