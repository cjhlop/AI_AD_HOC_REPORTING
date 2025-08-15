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

const cplData = [
  { month: "Jan", cpl: 45, cplWithoutOptimization: 48 },
  { month: "Feb", cpl: 42, cplWithoutOptimization: 46 },
  { month: "Mar", cpl: 43, cplWithoutOptimization: 48 },
  { month: "Apr", cpl: 38, cplWithoutOptimization: 45 },
  { month: "May", cpl: 35, cplWithoutOptimization: 44 },
  { month: "Jun", cpl: 32, cplWithoutOptimization: 42 },
  { month: "Jul", cpl: 30, cplWithoutOptimization: 41 },
  { month: "Aug", cpl: 28, cplWithoutOptimization: 40 },
  { month: "Sep", cpl: 25, cplWithoutOptimization: 38 },
  { month: "Oct", cpl: 26, cplWithoutOptimization: 40 },
  { month: "Nov", cpl: 22, cplWithoutOptimization: 38 },
  { month: "Dec", cpl: 20, cplWithoutOptimization: 37 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // payload[0] is cplWithoutOptimization, payload[1] is cpl
    return (
      <div className="p-3 bg-card border rounded-lg shadow-lg text-card-foreground">
        <p className="mb-2 font-bold text-base">{label}</p>
        <p className="text-lg font-semibold text-success">
          CPL with Optimizations: ${payload[1].value.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">
          Est. CPL without Optimizations: ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const CostPerLeadChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Per Lead (CPL) Trend</CardTitle>
        <CardDescription>Monthly CPL evolution due to platform optimizations.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cplData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `$${value}`}
              />
              <RechartsTooltip 
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                content={<CustomTooltip />}
              />
              <Line type="monotone" dataKey="cplWithoutOptimization" stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="cpl" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--success))' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
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

export default CostPerLeadChart;