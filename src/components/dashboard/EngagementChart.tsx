import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockEngagementData } from "@/data/mockDashboardData";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const seriesData = payload.find((p: any) => p.dataKey === 'rate');
    const benchmarkData = payload.find((p: any) => p.dataKey === 'benchmark');
    if (!seriesData || !benchmarkData) return null;

    const gap = seriesData.value - benchmarkData.value;

    return (
      <div className="p-3 bg-card border rounded-lg shadow-lg text-card-foreground">
        <p className="mb-2 font-bold text-base">{label}</p>
        <p className="text-sm text-primary">
          Engagement: {(seriesData.value * 100).toFixed(2)}%
        </p>
        <p className="text-sm text-muted-foreground">
          Benchmark: {(benchmarkData.value * 100).toFixed(2)}%
        </p>
        <p className={cn("mt-2 text-sm font-semibold", gap > 0 ? "text-success" : "text-destructive")}>
          Gap: {gap > 0 ? '+' : ''}{(gap * 100).toFixed(2)}%
        </p>
      </div>
    );
  }
  return null;
};

interface EngagementChartProps {
  selectedAudienceId: string | null;
}

const EngagementChart = ({ selectedAudienceId }: EngagementChartProps) => {
  const dataKey = selectedAudienceId || 'all';
  const chartData = mockEngagementData[dataKey as keyof typeof mockEngagementData];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle>Engagement Over Time</CardTitle>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
                <Button size="sm" variant={!selectedAudienceId ? 'secondary' : 'ghost'} className="h-7">All Audiences</Button>
                <Button size="sm" variant={selectedAudienceId ? 'secondary' : 'ghost'} className="h-7" disabled={!selectedAudienceId}>Selected</Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.series.map((d, i) => ({...d, benchmark: chartData.benchmark[i].rate}))}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => val.replace('Day ', '')} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="benchmark" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    <Line type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;