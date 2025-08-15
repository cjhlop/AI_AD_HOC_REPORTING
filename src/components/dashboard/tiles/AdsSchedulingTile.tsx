import React from "react";
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
import { Progress } from "@/components/ui/progress";
import { Info, Clock, ChevronRight, AlertTriangle } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { Link } from "react-router-dom";

const radialData = [{ name: "L1", value: 80, fill: "hsl(var(--primary))" }];

const sparklineData = [
  { name: "Page A", uv: 4000 },
  { name: "Page B", uv: 3000 },
  { name: "Page C", uv: 2000 },
  { name: "Page D", uv: 2780 },
  { name: "Page E", uv: 1890 },
  { name: "Page F", uv: 2390 },
  { name: "Page G", uv: 3490 },
];

const heatmapData = Array.from({ length: 7 * 24 }, (_, i) => ({
  day: Math.floor(i / 168 * 7),
  hour: i % 24,
  value: Math.random(),
}));
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const AdsSchedulingTile = () => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Ads Scheduling</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Explains adherence & savings formulas.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Updated 3 min ago</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 flex-grow">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#C4DAFD]">
              <div className="w-[92px] h-[92px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="70%"
                    outerRadius="100%"
                    data={radialData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      angleAxisId={0}
                      tick={false}
                    />
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={10}
                      angleAxisId={0}
                    />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xl font-bold fill-current"
                    >
                      80%
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm font-medium text-center">Spend on schedule</p>
              <p className="text-xs text-muted-foreground text-center">$12,345</p>
            </div>
            <div className="flex flex-col justify-center p-2 rounded-lg bg-[#C4DAFD]">
              <p className="text-sm font-medium">Prime-time Utilization</p>
              <Progress value={65} className="mt-2" />
              <p className="mt-1 text-xs text-muted-foreground">
                65% impressions in top hours
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-2 rounded-lg bg-[#C4DAFD]">
              <p className="text-sm font-medium">Schedule Adherence</p>
              <Badge className="mt-2">
                <Clock className="w-3 h-3 mr-1" />
                98%
              </Badge>
            </div>
            <div className="p-2 rounded-lg bg-[#C4DAFD]">
              <p className="text-sm font-medium">Est. Savings (30d)</p>
              <p className="text-lg font-bold">$1,280</p>
              <div className="w-full h-8 mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineData}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="uv" stroke="hsl(var(--primary))" fill="url(#colorUv)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium">Hour-of-Week Heatmap (CTR)</p>
            <div className="grid grid-cols-[auto_repeat(24,minmax(0,1fr))] gap-1 items-center">
                {/* Top-left empty cell */}
                <div></div>
                {/* Hour labels */}
                {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="text-center text-xs text-muted-foreground">
                        {i % 6 === 0 ? i : ''}
                    </div>
                ))}

                {/* Day labels and heatmap cells */}
                {daysOfWeek.map((day, dayIndex) => (
                    <React.Fragment key={day}>
                        <div className="text-right text-xs text-muted-foreground pr-1">{day}</div>
                        {Array.from({ length: 24 }).map((_, hourIndex) => {
                            const dataPoint = heatmapData[dayIndex * 24 + hourIndex];
                            return (
                                <TooltipProvider key={`${dayIndex}-${hourIndex}`} delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="w-full aspect-square rounded-sm" style={{ backgroundColor: `hsl(var(--primary) / ${dataPoint.value})` }}></div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{daysOfWeek[dataPoint.day]}, {dataPoint.hour}:00, CTR: {(dataPoint.value * 10).toFixed(2)}%</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">Lower CTR &nbsp;&larr;&rarr;&nbsp; Higher CTR</p>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start pt-4 border-t">
        <div className="flex items-center text-sm text-muted-foreground">
            <AlertTriangle className="w-4 h-4 mr-2 text-accent" />
            <p>Timezone mismatches: 2 campaigns vs target geo.</p>
        </div>
        <Link to="/module/ads-scheduling" className="self-end mt-2">
            <Button variant="ghost" size="sm">
                Open Ads Scheduling
                <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AdsSchedulingTile;