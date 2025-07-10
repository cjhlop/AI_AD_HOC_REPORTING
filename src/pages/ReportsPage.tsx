import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from 'lucide-react';

export function ReportsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 h-full overflow-y-auto">
      <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Website Visitors
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">
              +18.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,234</div>
            <p className="text-xs text-muted-foreground">
              +12.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Traffic Source</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Google Ads</div>
            <p className="text-xs text-muted-foreground">
              Most popular source
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Visitor Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Detailed charts will be displayed here.</p>
          {/* Placeholder for a larger chart */}
          <div className="w-full h-64 bg-secondary rounded-md mt-4 flex items-center justify-center">
            <p className="text-muted-foreground">Chart coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}