import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface CacheSettingsDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function CacheSettingsDrawer({ isOpen, onOpenChange }: CacheSettingsDrawerProps) {
  const [isCacheEnabled, setIsCacheEnabled] = React.useState(true);
  const [frequency, setFrequency] = React.useState('manual');

  const handleSubmit = () => {
    // In a real application, you would save these settings.
    console.log({
      isCacheEnabled,
      frequency,
    });
    toast.success('Cache settings saved successfully!');
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Cache settings</SheetTitle>
          <SheetDescription>
            Configure caching to speed up dashboard loading by reusing recent results.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-caching" className="font-medium text-sm">
              Enable caching
            </Label>
            <Switch
              id="enable-caching"
              checked={isCacheEnabled}
              onCheckedChange={setIsCacheEnabled}
            />
          </div>
          <p className="text-sm text-muted-foreground -mt-4">
            Enable caching to speed up dashboard loading by reusing recent results. Choose a refresh schedule that fits your needs below.
          </p>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-card px-2 text-xs text-muted-foreground">
              Refresh settings
            </span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={frequency}
              onValueChange={setFrequency}
              disabled={!isCacheEnabled}
            >
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select a refresh schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
                <SelectItem value="manual">Manual refresh only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </SheetClose>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}