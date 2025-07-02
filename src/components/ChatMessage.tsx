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

            {/* Analysis & Conclusions */}
            <div className="mb-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">📊 Analysis Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <p className="text-sm text-gray-800 leading-relaxed">
                  <strong>Performance Overview:</strong> Your creative portfolio shows significant variation in performance, with Creative A emerging as the clear winner. The data reveals a 128% performance gap between your best and worst performing creatives, indicating substantial optimization opportunities.
                </p>
                <p className="text-sm text-gray-800 leading-relaxed">
                  <strong>Key Findings:</strong> Creative A demonstrates exceptional efficiency with a 3.2% CTR (60% above campaign average) and the lowest CPA at $67. In contrast, Creative C is underperforming with a 1.4% CTR and CPA of $156 - more than double your target cost per acquisition.
                </p>
                <p className="text-sm text-gray-800 leading-relaxed">
                  <strong>Budget Impact:</strong> Currently, your budget allocation doesn't align with performance. Creative A, despite driving 33% of total conversions, likely receives equal budget share. Reallocating spend could improve overall campaign ROAS by an estimated 25-30%.
                </p>
              </div>
            </div>

            {/* Strategic Insights */}
            <div className="mb-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">🎯 Strategic Insights</h3>
              <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                <p className="text-sm text-blue-900 leading-relaxed">
                  <strong>Creative Messaging Analysis:</strong> "Transform Your Business" (Creative A) resonates strongly with your target audience, suggesting transformation-focused messaging outperforms feature-based copy. This insight should inform future creative development.
                </p>
                <p className="text-sm text-blue-900 leading-relaxed">
                  <strong>Audience Alignment:</strong> The performance variance suggests different creatives appeal to different audience segments. Creative B shows promise but may need audience refinement or different placement strategies to reach its full potential.
                </p>
                <p className="text-sm text-blue-900 leading-relaxed">
                  <strong>Competitive Positioning:</strong> Your top-performing creative's 3.2% CTR significantly exceeds industry benchmarks (typically 0.9-2.1% for LinkedIn), indicating strong market positioning and message-market fit.
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <Card className="mb-6 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-900">💡 Actionable Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                    <div>
                      <p className="text-sm font-medium text-green-900">Immediate Budget Reallocation</p>
                      <p className="text-xs text-green-800">Increase Creative A budget by 40% and reduce Creative C by 60%. Expected impact: +$2,340 monthly savings with 25% more conversions.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                    <div>
                      <p className="text-sm font-medium text-green-900">Creative Testing Program</p>
                      <p className="text-xs text-green-800">Launch 3 variations of Creative A with different headlines. Test "Accelerate Growth", "Drive Innovation", and "Unlock Potential" messaging.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                    <div>
                      <p className="text-sm font-medium text-green-900">Audience Optimization</p>
                      <p className="text-xs text-green-800">Analyze Creative B's audience data - it may perform better with specific job titles or company sizes. Consider separate campaigns for different segments.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">4</div>
                    <div>
                      <p className="text-sm font-medium text-green-900">Performance Monitoring</p>
                      <p className="text-xs text-green-800">Set up automated alerts when CPA exceeds $120 or CTR drops below 2.0%. Review creative performance weekly to catch declining trends early.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🚀 Next Steps</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-900 leading-relaxed">
                  <strong>Timeline:</strong> Implement budget changes within 24 hours to capture immediate savings. Launch creative tests by end of week. Schedule follow-up analysis in 14 days to measure impact and refine strategy further.
                </p>
                <p className="text-sm text-yellow-900 leading-relaxed mt-2">
                  <strong>Expected Outcome:</strong> These optimizations should improve overall campaign efficiency by 20-30%, reduce average CPA to $75-80, and increase monthly conversion volume by 15-20 conversions.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
              <Button size="sm" variant="outline">
                <Pin className="w-3 h-3 mr-1" />
                Pin
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-3 h-3 mr-1" />
                Export Report
              </Button>
              <Button size="sm" variant="outline">
                <Copy className="w-3 h-3 mr-1" />
                Copy Analysis
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