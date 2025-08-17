import React from 'react';
import { Command } from '@/data/commandData';
import { ChevronRight } from 'lucide-react';

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

  if (!item.children || item.children.length === 0) {
    return (
      <div 
        className="p-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer"
        onClick={handleClick}
      >
        {item.name}
      </div>
    );
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsSubMenuOpen(true)}
      onMouseLeave={() => setIsSubMenuOpen(false)}
    >
      <div 
        className="flex items-center justify-between p-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer"
        onClick={handleClick}
      >
        <span>{item.name}</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
      </div>
      {isSubMenuOpen && (
        <div className="absolute left-full -top-2 w-56 bg-white border rounded-md shadow-lg p-1 z-10">
          {item.children.map(child => (
            <ModuleMenuItem key={child.name} item={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
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