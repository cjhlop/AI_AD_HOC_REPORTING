import React from 'react';
import { Command } from '@/data/commandData';
import { ChevronRight } from 'lucide-react';

interface ModuleHoverMenuProps {
  items: Command[];
}

const ModuleMenuItem = ({ item }: { item: Command }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  if (!item.children || item.children.length === 0) {
    return (
      <div className="p-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer">
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
      <div className="flex items-center justify-between p-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer">
        <span>{item.name}</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
      </div>
      {isSubMenuOpen && (
        <div className="absolute left-full -top-2 w-56 bg-white border rounded-md shadow-lg p-1 z-10">
          {item.children.map(child => (
            <ModuleMenuItem key={child.name} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const ModuleHoverMenu = ({ items }: ModuleHoverMenuProps) => {
  return (
    <div className="p-1">
      {items.map(item => (
        <ModuleMenuItem key={item.name} item={item} />
      ))}
    </div>
  );
};

export default ModuleHoverMenu;