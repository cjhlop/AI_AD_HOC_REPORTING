import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";

const savingsData = [
  { month: "Jan", spendWithOptimization: 10000, spendWithoutOptimization: 12100 },
  { month: "Feb", spendWithOptimization: 11000, spendWithoutOptimization: 13500 },
  { month: "Mar", spendWithOptimization: 9000, spendWithoutOptimization: 10800 },
  { month: "Apr", spendWithOptimization: 12000, spendWithoutOptimization: 15200 },
  { month: "May", spendWithOptimization: 12500, spendWithoutOptimization: 16000 },
  { month: "Jun", spendWithOptimization: 14000, spendWithoutOptimization: 18812 },
  { month: "Jul", spendWithOptimization: 13500, spendWithoutOptimization: 18000 },
  { month: "Aug", spendWithOptimization: 15000, spendWithoutOptimization: 20100 },
  { month: "Sep", spendWithOptimization: 14500, spendWithoutOptimization: 19400 },
  { month: "Oct", spendWithOptimization: 16000, spendWithoutOptimization: 21500 },
  { month: "Nov", spendWithOptimization: 17000, spendWithoutOptimization: 23200 },
  { month: "Dec", spendWithOptimization: 16500, spendWithoutOptimization: 22300 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const spendWithout = payload[0].value;
    const spendWith = payload[1].value;
    const saved = spendWithout - spendWith;

    return (
      <div className="p-3 bg-card border rounded-lg shadow-lg text-card-foreground">
        <p className="mb-2 font-bold text-base">{label}</p>
        <p className="text-sm text-muted-foreground">
          Spend without optimization: ${spendWithout.toLocaleString()}
        </p>
        <p className="text-sm text-primary">
          Spend with optimization: ${spendWith.toLocaleString()}
        </p>
        <p className="mt-2 text-lg font-semibold text-success">
          Total Saved: ${saved.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

const CostSavingsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Cost Savings</CardTitle>
        <CardDescription>Estimated savings from optimizations like frequency capping and ad scheduling.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={savingsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `$${(value as number / 1000)}k`}
              />
              <RechartsTooltip 
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                content={<CustomTooltip />}
              />
              <Line type="monotone" dataKey="spendWithoutOptimization" stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="spendWithOptimization" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span>With Optimizations</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-8 h-px border-b-2 border-dashed border-destructive" />
                <span>Without (Est.)</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostSavingsChart;