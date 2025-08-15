import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ChevronLeft,
  Zap,
  Clock,
  Shield,
  Users,
  Target,
  DollarSign,
  Globe,
  UserPlus,
  List,
  Link2,
  Upload,
  BarChart,
  FileText,
  MessageSquareWarning,
  Settings,
  Bot,
} from "lucide-react";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/ai-chat", icon: Bot, label: "AI Co-Pilot", badge: "Soon" },
];

const optimizationItems = [
    { href: "/module/ads-scheduling", icon: Clock, label: "Ads Scheduling" },
    { href: "/module/frequency-cap", icon: Shield, label: "Frequency Cap" },
    { href: "/module/audience-tuning", icon: Users, label: "Audience Tuning" },
    { href: "/module/budget-control", icon: Target, label: "Budget Control" },
    { href: "/module/influenced-revenue", icon: DollarSign, label: "Influenced Revenue" },
];

const audienceItems = [
    { href: "/module/website-visitors", icon: Globe, label: "Website Visitors" },
    { href: "/module/prospector", icon: UserPlus, label: "Prospector" },
    { href: "/module/lists", icon: List, label: "Lists" },
    { href: "/module/my-connections", icon: Link2, label: "My Connections" },
    { href: "/module/uploaded", icon: Upload, label: "Uploaded" },
];

const analyticsItems = [
    { href: "/module/custom-dashboards", icon: BarChart, label: "Custom Dashboards", badge: "Soon" },
    { href: "/module/li-influenced-pipeline", icon: FileText, label: "LI Influenced Pipeline" },
    { href: "/module/linkedin-ads-insights", icon: BarChart, label: "LinkedIn Ads Insights" },
    { href: "/module/website-visitor-insights", icon: Globe, label: "Website Visitor Insights" },
    { href: "/module/multichannel-marketing", icon: BarChart, label: "Multichannel Marketing" },
];

const bottomItems = [
    { href: "/module/report-issue", icon: MessageSquareWarning, label: "Report Issue" },
    { href: "/module/settings", icon: Settings, label: "Settings" },
]

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const NavLink = ({ href, icon: Icon, label, badge }: { href: string, icon: React.ElementType, label: string, badge?: string }) => {
    const isActive = location.pathname === href;
    const isAiCopilot = href === "/ai-chat";

    if (isAiCopilot) {
      return (
        <Link to={href}>
          <Button
            variant="default"
            className={cn(
              "w-full justify-start bg-accent text-accent-foreground hover:bg-accent/90"
            )}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
            {badge && <Badge className="ml-auto bg-accent-foreground/20 text-accent-foreground">{badge}</Badge>}
          </Button>
        </Link>
      );
    }

    return (
      <Link to={href}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
            isActive && "bg-card text-card-foreground hover:bg-card/90"
          )}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
          {badge && <Badge className="ml-auto">{badge}</Badge>}
        </Button>
      </Link>
    );
  };

  return (
    <div className={cn("relative h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all", isCollapsed ? "w-16" : "w-64")}>
        <div className="p-4">
            <Link to="/" className="flex items-center gap-2">
                <Zap className="w-8 h-8 text-accent" />
                {!isCollapsed && <span className="text-xl font-bold">DemandSense</span>}
            </Link>
        </div>
        <nav className="flex flex-col p-2 space-y-1">
            {navItems.map(item => <NavLink key={item.href} {...item} />)}
            
            {!isCollapsed && <h3 className="px-2 pt-4 text-xs font-semibold tracking-wider uppercase text-sidebar-foreground/70">LinkedIn Ads Optimization</h3>}
            {optimizationItems.map(item => <NavLink key={item.href} {...item} />)}

            {!isCollapsed && <h3 className="px-2 pt-4 text-xs font-semibold tracking-wider uppercase text-sidebar-foreground/70">Audiences</h3>}
            {audienceItems.map(item => <NavLink key={item.href} {...item} />)}

            {!isCollapsed && <h3 className="px-2 pt-4 text-xs font-semibold tracking-wider uppercase text-sidebar-foreground/70">Analytics</h3>}
            {analyticsItems.map(item => <NavLink key={item.href} {...item} />)}
        </nav>
        <div className="absolute bottom-0 w-full p-2 border-t border-sidebar-border">
            {bottomItems.map(item => <NavLink key={item.href} {...item} />)}
        </div>
    </div>
  );
};

export default Sidebar;