import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  RotateCcw,
  Settings,
  Download
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ChatMessageProps {
  message: {
    id: number;
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
    hasChart?: boolean;
    hasTable?: boolean;
    chartData?: any;
    tableData?: any;
    insights?: Array<{
      label: string;
      value: string;
      trend: 'up' | 'down' | 'neutral';
      change: string;
    }>;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (message.type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-3xl">
          <div className="bg-blue-600 text-white rounded-2xl px-4 py-3">
            <p className="text-sm">{message.content}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-full w-full">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-semibold text-sm">AI</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 leading-relaxed">{message.content}</p>
            </div>
          </div>

          {/* Insights Cards */}
          {message.insights && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h4>
              <div className="space-y-4">
                {message.insights.map((insight, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500 h-80 relative">
                    <CardContent className="p-6 h-full flex flex-col justify-center">
                      <div className="absolute top-4 right-4 flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mb-4 pr-32">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-2">{insight.label}</p>
                          <p className="text-2xl font-bold text-gray-900 mb-2">{insight.value}</p>
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(insight.trend)}
                            <span className={`text-sm font-medium ${getTrendColor(insight.trend)}`}>
                              {insight.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Chart */}
          {message.hasChart && message.chartData && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Performance Overview</h4>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={message.chartData.barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="ctr" fill="#3b82f6" name="CTR %" />
                        <Bar dataKey="conversions" fill="#10b981" name="Conversions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Table */}
          {message.hasTable && message.tableData && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Detailed Breakdown</h4>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Creative
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Impressions
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Clicks
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            CTR
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Conversions
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            CPA
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {message.tableData.map((row: any, index: number) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                {row.creative}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {row.impressions.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {row.clicks.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {row.ctr}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {row.conversions}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${row.cpa}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge 
                                variant={
                                  row.status === 'Top Performer' ? 'default' :
                                  row.status === 'Good' ? 'secondary' :
                                  row.status === 'Underperforming' ? 'destructive' :
                                  'outline'
                                }
                                className="text-xs"
                              >
                                {row.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-4">
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;