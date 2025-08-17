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
  isChartMenu?: boolean;
}

// Component for nested menu items (used for Data, Metrics)
const NestedMenuItem = ({ item, onSelect }: { item: Command, onSelect: (command: Command) => void }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.children || item.children.length === 0) {
      onSelect(item);
    }
  };

  const menuItemContent = (
    <div 
      className="flex items-center justify-between p-2 text-sm hover:bg-secondary rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <span>{item.name}</span>
      {item.children && item.children.length > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
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
          <div className="absolute left-full -top-2 w-56 bg-card border rounded-md shadow-lg p-1 z-10">
            {item.children.map(child => (
              <NestedMenuItem key={child.name} item={child} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return menuItemContent;
};

const ModuleHoverMenu = ({ items, onSelect, isChartMenu = false }: ModuleHoverMenuProps) => {
  // New logic for the flat chart menu
  if (isChartMenu) {
    return (
      <div className="p-2 max-h-[400px] overflow-y-auto">
        {items.map(category => (
          <div key={category.name}>
            <p className="text-xs font-semibold text-muted-foreground px-2 py-1.5 mt-2 first:mt-0">{category.name}</p>
            {category.children?.map(chart => {
              const chartItemContent = (
                <div 
                  className="flex items-center justify-between p-2 text-sm hover:bg-secondary rounded-md cursor-pointer"
                  onClick={() => onSelect(chart)}
                >
                  <span>{chart.name}</span>
                </div>
              );

              return (
                <HoverCard key={chart.name} openDelay={200} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    {chartItemContent}
                  </HoverCardTrigger>
                  {chart.previewImage && (
                    <HoverCardContent side="right" align="start" className="ml-2 w-auto p-1 border-2 rounded-lg shadow-lg bg-card">
                      <img src={chart.previewImage} alt={`${chart.name} preview`} className="rounded-md max-w-xs" />
                    </HoverCardContent>
                  )}
                </HoverCard>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  // Original logic for nested menus (Data, Metrics)
  return (
    <div className="p-1">
      {items.map(item => (
        <NestedMenuItem key={item.name} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ModuleHoverMenu;