import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BarChart3,
  RefreshCw,
  Settings,
  Share2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
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

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Top Performer':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Good':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Average':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Underperforming':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (message.type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-3xl">
          <div className="bg-blue-600 text-white rounded-lg px-4 py-3">
            <p className="text-sm">{message.content}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">{formatTime(message.timestamp)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-5xl w-full">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 leading-relaxed mb-4">{message.content}</p>
              
              {/* Insights Cards */}
              {message.insights && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {message.insights.map((insight, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">{insight.label}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-2xl font-bold text-gray-900">{insight.value}</span>
                              {getTrendIcon(insight.trend)}
                            </div>
                            <p className={`text-xs mt-1 ${getTrendColor(insight.trend)}`}>
                              {insight.change}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1 ml-2">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Settings className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Chart */}
              {message.hasChart && message.chartData && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Creative Performance Analysis</h4>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                  <Card>
                    <CardContent className="p-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={message.chartData.barData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" orientation="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="ctr" fill="#3B82F6" name="CTR %" />
                          <Bar yAxisId="right" dataKey="conversions" fill="#10B981" name="Conversions" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Table */}
              {message.hasTable && message.tableData && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Creative Performance Details</h4>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creative</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impressions</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPA</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {message.tableData.map((row: any, index: number) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{row.creative}</div>
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
                                  <Badge className={`${getStatusBadgeColor(row.status)} border`}>
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
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{formatTime(message.timestamp)}</p>
      </div>
    </div>
  );
};

export default ChatMessage;