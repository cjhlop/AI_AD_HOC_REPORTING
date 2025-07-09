import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, BarChart2, Users } from 'lucide-react';

interface Command {
  name: string;
  description: string;
  icon: React.ElementType;
}

const commands: Command[] = [
  { name: '/dataset LinkedIn Ads', description: 'Insert LinkedIn Ads data', icon: BarChart2 },
  { name: '/dataset Website Visitor', description: 'Insert Website Visitor data', icon: Users },
  { name: '/dataset Google Ads', description: 'Insert Google Ads data', icon: BarChart2 },
  { name: '/dataset Meta Ads', description: 'Insert Meta Ads data', icon: BarChart2 },
  { name: '/metric Impressions', description: 'Insert Impressions metric', icon: Database },
  { name: '/metric CTR', description: 'Insert Click-Through Rate metric', icon: Database },
  { name: '/metric CPA', description: 'Insert Cost Per Acquisition metric', icon: Database },
];

interface CommandMenuProps {
  onSelect: (command: string) => void;
}

const CommandMenu = ({ onSelect }: CommandMenuProps) => {
  return (
    <Card className="absolute bottom-full mb-2 w-full max-w-md shadow-lg z-10">
      <CardContent className="p-2">
        <p className="text-xs font-semibold text-gray-500 px-2 py-1">Commands</p>
        <div className="flex flex-col">
          {commands.map((command) => (
            <Button
              key={command.name}
              variant="ghost"
              className="w-full justify-start h-auto py-2 px-2"
              onClick={() => onSelect(command.name)}
            >
              <command.icon className="w-4 h-4 mr-3 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-left">{command.name}</p>
                <p className="text-xs text-gray-500 text-left">{command.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommandMenu;