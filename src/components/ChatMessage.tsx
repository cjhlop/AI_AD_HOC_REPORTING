import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Pin, 
  Download, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

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
    insights?: any;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  if (message.type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-md">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    );
  }

  // AI Response
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl w-full shadow-sm">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            {/* AI Response Text */}
            <div className="prose prose-sm max-w-none mb-6">
              <p className="text-gray-900 leading-relaxed">{message.content}</p>
            </div>

            {/* Key Insights Cards */}
            {message.insights && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {message.insights.map((insight: any, index: number) => (
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
            )}

            {/* Chart */}
            {message.hasChart && message.chartData && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Creative Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={message.chartData.barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="ctr" fill="#3B82F6" name="CTR %" />
                        <Bar dataKey="conversions" fill="#10B981" name="Conversions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Data Table */}
            {message.hasTable && message.tableData && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Creative Performance Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium">Creative</th>
                          <th className="text-left p-2 font-medium">Impressions</th>
                          <th className="text-left p-2 font-medium">Clicks</th>
                          <th className="text-left p-2 font-medium">CTR</th>
                          <th className="text-left p-2 font-medium">Conversions</th>
                          <th className="text-left p-2 font-medium">CPA</th>
                          <th className="text-left p-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {message.tableData.map((row: any, index: number) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-2 font-medium">{row.creative}</td>
                            <td className="p-2">{row.impressions.toLocaleString()}</td>
                            <td className="p-2">{row.clicks.toLocaleString()}</td>
                            <td className="p-2">{row.ctr}%</td>
                            <td className="p-2">{row.conversions}</td>
                            <td className="p-2">${row.cpa}</td>
                            <td className="p-2">
                              <Badge variant={row.status === 'Top Performer' ? 'default' : 
                                           row.status === 'Underperforming' ? 'destructive' : 'secondary'}>
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
            )}

            {/* Recommendations */}
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">💡 Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• <strong>Scale Creative A:</strong> Increase budget by 40% - it's driving 65% of conversions with lowest CPA</li>
                  <li>• <strong>Pause Creative C:</strong> CTR is 60% below average and CPA is 2.3x higher than target</li>
                  <li>• <strong>Test variations:</strong> Create 2-3 variations of Creative A with different headlines</li>
                  <li>• <strong>Audience optimization:</strong> Creative B performs better with 35-44 age group</li>
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
              <Button size="sm" variant="outline">
                <Pin className="w-3 h-3 mr-1" />
                Pin
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-3 h-3 mr-1" />
                Export CSV
              </Button>
              <Button size="sm" variant="outline">
                <Copy className="w-3 h-3 mr-1" />
                Copy SQL
              </Button>
              <div className="flex-1" />
              <Button size="sm" variant="ghost">
                <ThumbsUp className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost">
                <ThumbsDown className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;