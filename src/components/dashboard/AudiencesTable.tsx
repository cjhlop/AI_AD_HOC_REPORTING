import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { mockAudiences } from "@/data/mockDashboardData";
import { Audience, AudienceSource } from "../../types";
import { cn } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ArrowDown, ArrowUp, Search, SlidersHorizontal } from "lucide-react";

const sourceBadgeMap: Record<AudienceSource, string> = {
  LI: "bg-blue-500 hover:bg-blue-600",
  WebID: "bg-green-500 hover:bg-green-600",
  CRM: "bg-purple-500 hover:bg-purple-600",
};

const benchmarkGapMap = {
  Exceeding: "bg-success text-success-foreground",
  Near: "bg-secondary text-secondary-foreground",
  Below: "bg-destructive text-destructive-foreground",
  "N/A": "bg-muted text-muted-foreground",
};

const DeltaIndicator = ({ value }: { value: number }) => {
  const isPositive = value > 0;
  return (
    <span className={cn("text-xs flex items-center", isPositive ? "text-success" : "text-destructive")}>
      {isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
      {Math.abs(value * 100).toFixed(1)}%
    </span>
  );
};

const StageMixBar = ({ mix }: { mix: Audience['stageMix'] }) => {
    const stages = [
        { key: 'aware', color: 'bg-blue-200', label: 'Aware' },
        { key: 'engaged', color: 'bg-blue-400', label: 'Engaged' },
        { key: 'warm', color: 'bg-orange-400', label: 'Warm' },
        { key: 'sql', color: 'bg-green-500', label: 'SQL' },
    ];

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex w-24 h-2 rounded-full overflow-hidden">
                        {stages.map(stage => (
                            <div key={stage.key} className={stage.color} style={{ width: `${mix[stage.key as keyof typeof mix] * 100}%` }} />
                        ))}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="text-sm">
                        {stages.map(stage => (
                            <div key={stage.key} className="flex items-center justify-between gap-4">
                                <span>{stage.label}:</span>
                                <span>{Math.round(mix[stage.key as keyof typeof mix] * 100)}%</span>
                            </div>
                        ))}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

const EngagementSparkline = ({ data }: { data: { day: string; rate: number }[] }) => (
    <div className="w-24 h-8">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="sparkline-color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="rate" stroke="hsl(var(--primary))" fill="url(#sparkline-color)" strokeWidth={2} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

interface AudiencesTableProps {
  onAudienceSelect: (id: string | null) => void;
  selectedAudienceId: string | null;
}

const AudiencesTable = ({ onAudienceSelect, selectedAudienceId }: AudiencesTableProps) => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d">("30d");

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Audiences</CardTitle>
            <div className="flex w-full sm:w-auto items-center gap-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search audiences..." className="pl-8 w-full" />
                </div>
                <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Audience</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead>Benchmark Gap</TableHead>
              <TableHead>Warm Leads</TableHead>
              <TableHead>Stage Mix</TableHead>
              <TableHead>30d Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAudiences.map((audience) => (
              <TableRow 
                key={audience.id} 
                className={cn("cursor-pointer", selectedAudienceId === audience.id && "bg-secondary hover:bg-secondary/90")}
                onClick={() => onAudienceSelect(audience.id === selectedAudienceId ? null : audience.id)}
              >
                <TableCell>
                  <div className="font-medium">{audience.name}</div>
                  <Badge className={cn("text-white text-xs", sourceBadgeMap[audience.source])}>{audience.source}</Badge>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        {audience.size.toLocaleString()}
                        <DeltaIndicator value={audience.sizeDelta} />
                    </div>
                </TableCell>
                <TableCell>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center gap-2">
                                    {(audience.engagementRate * 100).toFixed(1)}%
                                    <DeltaIndicator value={audience.engagementRateDelta} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Engaged accounts ÷ total accounts in audience.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </TableCell>
                <TableCell>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Badge className={cn(benchmarkGapMap[audience.benchmarkGap])}>{audience.benchmarkGap}</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>(Your engagement − Benchmark) ÷ Benchmark.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <span>{audience.warmLeadsCount}</span>
                        <Badge variant="secondary" className="rounded-full">
                            {((audience.warmLeadsCount / audience.size) * 100).toFixed(1)}%
                        </Badge>
                    </div>
                </TableCell>
                <TableCell>
                    <StageMixBar mix={audience.stageMix} />
                </TableCell>
                <TableCell>
                    <EngagementSparkline data={audience.engagementHistory} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AudiencesTable;