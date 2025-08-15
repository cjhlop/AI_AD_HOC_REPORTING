import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, ChevronRight, Filter, Bookmark, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";

const wasteMapData = [
    { segment: 'Education', x: 0.8, y: 0.2, size: 0.3, color: 'hsl(var(--destructive))' },
    { segment: 'Finance', x: 0.5, y: 0.4, size: 0.5, color: 'hsl(var(--muted))' },
    { segment: 'Healthcare', x: 0.3, y: 0.7, size: 0.6, color: 'hsl(var(--primary))' },
];

const opportunityMapData = [
    { segment: 'Tech', x: 0.2, y: 0.8, size: 0.7, color: 'hsl(var(--primary))' },
    { segment: 'Manufacturing', x: 0.4, y: 0.6, size: 0.4, color: 'hsl(var(--primary))' },
];

const AudienceTuningTile = () => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Audience Tuning</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clarifies immediate vs weekly exclusions.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Updated 12 min ago</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 flex-grow">
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="p-2 rounded-lg bg-[#C4DAFD]">
                    <p className="text-xs font-medium text-muted-foreground">Immediate Exclusions (7d)</p>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        <p className="text-lg font-bold">128</p>
                    </div>
                </div>
                <div className="p-2 rounded-lg bg-[#C4DAFD]">
                    <p className="text-xs font-medium text-muted-foreground">Upvotes (7d)</p>
                    <div className="flex items-center gap-2">
                        <Bookmark className="w-4 h-4" />
                        <p className="text-lg font-bold">42</p>
                    </div>
                </div>
                <div className="p-2 rounded-lg bg-[#C4DAFD] col-span-2">
                    <p className="text-xs font-medium text-muted-foreground">ΔCPL vs Kept Segments (14d)</p>
                    <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-success" />
                        <p className="text-lg font-bold text-success">-18%</p>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-sm font-medium">Waste Map (Firmographic)</p>
                <div className="relative w-full h-32 p-2 rounded-lg bg-[#C4DAFD]">
                    {wasteMapData.map(d => (
                        <TooltipProvider key={d.segment}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="absolute rounded-full" style={{ left: `${d.x*100}%`, top: `${d.y*100}%`, width: `${d.size*50}px`, height: `${d.size*50}px`, backgroundColor: d.color, transform: 'translate(-50%, -50%)' }}></div>
                                </TooltipTrigger>
                                <TooltipContent><p>{d.segment}</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>
            </div>
        </div>
        <div className="space-y-2">
            <p className="text-sm font-medium">Opportunity Map</p>
            <div className="relative w-full h-32 p-2 rounded-lg bg-[#C4DAFD]">
                {opportunityMapData.map(d => (
                    <TooltipProvider key={d.segment}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="absolute rounded-full" style={{ left: `${d.x*100}%`, top: `${d.y*100}%`, width: `${d.size*50}px`, height: `${d.size*50}px`, backgroundColor: d.color, transform: 'translate(-50%, -50%)' }}></div>
                            </TooltipTrigger>
                            <TooltipContent><p>{d.segment}</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>
            <div className="p-2 space-y-1 text-xs rounded-lg bg-[#C4DAFD]">
                <p className="font-medium">Audit Summary:</p>
                <p className="truncate text-muted-foreground">Downvoted ‘Higher Education’</p>
                <p className="truncate text-muted-foreground">Upvoted ‘SaaS Companies’</p>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start pt-4 border-t">
        <Link to="/module/audience-tuning" className="self-end">
            <Button variant="ghost" size="sm">
                Open Audience Tuning
                <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AudienceTuningTile;