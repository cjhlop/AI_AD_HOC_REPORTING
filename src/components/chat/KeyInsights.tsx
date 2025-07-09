import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Insight {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  change?: string;
}

interface KeyInsightsProps {
  insights: Insight[];
}

const KeyInsights = ({ insights }: KeyInsightsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {insights.map((insight, index) => (
        <Card key={index} className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{insight.label}</p>
                <p className="text-2xl font-bold text-gray-900">{insight.value}</p>
              </div>
              <div className={`p-2 rounded-full ${
                insight.trend === 'up' ? 'bg-green-100' : 
                insight.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
              }`}>
                {insight.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                {insight.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                {insight.trend === 'neutral' && <Minus className="w-4 h-4 text-gray-600" />}
              </div>
            </div>
            {insight.change && (
              <p className={`text-xs mt-1 ${
                insight.trend === 'up' ? 'text-green-600' : 
                insight.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {insight.change}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KeyInsights;