import React from 'react';
import { Command } from '@/data/commandData';
import { ChevronRight } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface ModuleHoverMenuProps {
  items: Command[];
  onSelect: (command: Command) => void;
}

const ModuleMenuItem = ({ item, onSelect }: { item: Command, onSelect: (command: Command) => void }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.children || item.children.length === 0) {
      onSelect(item);
    }
  };

  const menuItemContent = (
    <div 
      className="flex items-center justify-between p-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <span>{item.name}</span>
      {item.children && item.children.length > 0 && <ChevronRight className="w-4 h-4 text-gray-500" />}
    </div>
  );

  if (item.children && item.children.length > 0) {
    return (
      <div 
        className="relative"
        onMouseEnter={() => setIsSubMenuOpen(true)}
        onMouseLeave={() => setIsSubMenuOpen(false)}
      >
        {menuItemContent}
        {isSubMenuOpen && (
          <div className="absolute left-full -top-2 w-56 bg-white border rounded-md shadow-lg p-1 z-10">
            {item.children.map(child => (
              <ModuleMenuItem key={child.name} item={child} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.previewImage) {
    return (
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          {menuItemContent}
        </HoverCardTrigger>
        <HoverCardContent side="right" align="start" className="ml-2 w-auto p-1 border-2 rounded-lg">
          <img src={item.previewImage} alt={`${item.name} preview`} className="rounded-md max-w-xs" />
        </HoverCardContent>
      </HoverCard>
    );
  }

  return menuItemContent;
};

const ModuleHoverMenu = ({ items, onSelect }: ModuleHoverMenuProps) => {
  return (
    <div className="p-1">
      {items.map(item => (
        <ModuleMenuItem key={item.name} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ModuleHoverMenu;