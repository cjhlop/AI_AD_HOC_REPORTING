import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { datasets, metrics, Command } from '@/data/commandData';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface CommandMenuProps {
  onSelect: (command: Command) => void;
}

const CommandMenu = ({ onSelect }: CommandMenuProps) => {
  const [path, setPath] = useState<string[]>([]);
  const [currentItems, setCurrentItems] = useState<Command[]>([]);
  const [currentTitle, setCurrentTitle] = useState('Commands');

  useEffect(() => {
    if (path.length === 0) {
      setCurrentItems([]); // Will render sections
      setCurrentTitle('Commands');
      return;
    }

    let currentLevel: Command | { children: Command[] } = { children: datasets };
    path.forEach(segment => {
      const found = currentLevel.children?.find(item => item.name === segment);
      if (found) {
        currentLevel = found;
      }
    });

    setCurrentItems(currentLevel.children || []);
    setCurrentTitle(path[path.length - 1]);
  }, [path]);

  const goBack = () => {
    setPath(path.slice(0, -1));
  };

  const renderItem = (item: Command) => {
    const Icon = item.icon;
    return (
      <div key={item.name} className="flex items-center w-full rounded-md hover:bg-gray-100/80">
        <button
          type="button"
          className="flex-grow flex items-center text-left p-2"
          onClick={() => onSelect(item)}
        >
          {Icon && <Icon className="w-4 h-4 mr-3 text-gray-600 flex-shrink-0" />}
          <div className="flex-1">
            <p className="text-sm font-medium">{item.name}</p>
            {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
          </div>
        </button>
        {item.children && item.children.length > 0 && (
          <button
            type="button"
            className="p-2 rounded-md hover:bg-gray-200/80 flex-shrink-0 mr-1"
            onClick={(e) => {
              e.stopPropagation();
              setPath([...path, item.name]);
            }}
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>
    );
  };

  return (
    <Card className="absolute bottom-full mb-2 w-full max-w-md shadow-lg z-10">
      <CardContent className="p-2">
        <div className="flex items-center px-2 py-1 border-b mb-1">
          {path.length > 0 && (
            <Button variant="ghost" size="icon" className="h-7 w-7 mr-2" onClick={goBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <p className="text-sm font-semibold text-gray-600">{currentTitle}</p>
        </div>
        
        <div className="flex flex-col max-h-80 overflow-y-auto">
          {path.length === 0 ? (
            <>
              <p className="text-xs font-semibold text-gray-500 px-2 py-1 mt-1">Datasets</p>
              {datasets.map(renderItem)}
              <p className="text-xs font-semibold text-gray-500 px-2 py-1 mt-2">Metrics</p>
              {metrics.map(renderItem)}
            </>
          ) : (
            currentItems.map(renderItem)
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommandMenu;