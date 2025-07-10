import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  color?: 'blue' | 'multicolor' | 'indigo' | 'orange' | 'gray';
  onRemove: () => void;
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200/60',
  multicolor: 'bg-gradient-to-r from-red-100 via-yellow-100 to-blue-100 text-gray-800 border-gray-200 hover:shadow-inner',
  indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200/60',
  orange: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200/60',
  gray: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200/80',
};

export const Chip = ({ label, color = 'gray', onRemove }: ChipProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        'inline-flex items-center gap-x-1 rounded-md px-2 py-0 text-sm font-medium mr-1 whitespace-nowrap',
        colorClasses[color]
      )}
    >
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="group relative -mr-1 h-4 w-4 rounded-sm hover:bg-black/10"
      >
        <span className="sr-only">Remove</span>
        <X className="h-3.5 w-3.5 text-current" />
        <span className="absolute -inset-1" />
      </button>
    </Badge>
  );
};