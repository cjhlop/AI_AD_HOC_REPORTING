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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info, ChevronRight } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { Link } from "react-router-dom";

const radialData = [{ name: "L1", value: 92, fill: "hsl(var(--primary))" }];
const barData = [
  { name: "1-2", value: 4500 },
  { name: "3-5", value: 7200 },
  { name: "6-9", value: 3100 },
  { name: "10+", value: 1200 },
];
const nearCapData = [
    { company: "Innovate Inc.", exposures: "8/10", lastSeen: "2h ago", campaigns: 3 },
    { company: "Quantum Solutions", exposures: "9/12", lastSeen: "1d ago", campaigns: 2 },
    { company: "Synergy Corp", exposures: "7/10", lastSeen: "5h ago", campaigns: 5 },
];

const FrequencyCapTile = () => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Frequency Cap</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Defines over-frequency and blocked impressions.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Updated 5 min ago</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 flex-grow">
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#C4DAFD]">
                    <div className="w-[92px] h-[92px]">
                        <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart innerRadius="70%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
                            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                            <RadialBar background dataKey="value" cornerRadius={10} angleAxisId={0} />
                            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold fill-current">92%</text>
                        </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-sm font-medium text-center">Cap Adoption</p>
                </div>
                <div className="space-y-4">
                    <div className="p-2 rounded-lg bg-[#C4DAFD]">
                        <p className="text-sm font-medium">Over-Frequency Rate</p>
                        <Badge variant="destructive" className="mt-1">3.4%</Badge>
                    </div>
                    <div className="p-2 rounded-lg bg-[#C4DAFD]">
                        <p className="text-sm font-medium">Near-Cap Companies</p>
                        <p className="text-lg font-bold mt-1">17</p>
                    </div>
                </div>
            </div>
            <div className="p-2 rounded-lg bg-[#C4DAFD]">
                <p className="text-sm font-medium">Exposure Distribution (MTD)</p>
                <div className="w-full h-24 mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <RechartsTooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{backgroundColor: 'hsl(var(--background))', borderRadius: 'var(--radius)'}} />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
        <div className="space-y-2">
            <p className="text-sm font-medium">Near-Cap Table</p>
            <div className="rounded-lg overflow-hidden bg-[#C4DAFD]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="h-8">Company</TableHead>
                            <TableHead className="h-8">Exposures</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {nearCapData.map(item => (
                            <TableRow key={item.company}>
                                <TableCell className="py-1 text-xs">{item.company}</TableCell>
                                <TableCell className="py-1 text-xs">{item.exposures}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start pt-4 border-t">
        <p className="text-xs text-muted-foreground">Enforcement via weekly exclusion sync.</p>
        <Link to="/module/frequency-cap" className="self-end mt-2">
            <Button variant="ghost" size="sm">
                Open Frequency Cap
                <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FrequencyCapTile;