import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { 
  ArrowLeft,
  Pin, 
  Download, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Settings,
  PinIcon,
  Share,
  BookmarkPlus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Link } from 'react-router-dom';

const AIResponse = () => {
  // Sample data for creative optimization insights
  const chartData = [
    { name: 'Creative A', ctr: 3.2, conversions: 45, impressions: 45230, clicks: 1447 },
    { name: 'Creative B', ctr: 2.1, conversions: 28, impressions: 38940, clicks: 818 },
    { name: 'Creative C', ctr: 1.4, conversions: 12, impressions: 52100, clicks: 729 },
    { name: 'Creative D', ctr: 2.8, conversions: 35, impressions: 41200, clicks: 1154 },
    { name: 'Creative E', ctr: 1.9, conversions: 18, impressions: 36800, clicks: 699 }
  ];

  const tableData = [
    { creative: 'Creative A - "Transform Your Business"', impressions: 45230, clicks: 1447, ctr: 3.2, conversions: 45, cpa: 67, status: 'Top Performer' },
    { creative: 'Creative B - "Unlock Growth Potential"', impressions: 38940, clicks: 818, ctr: 2.1, conversions: 28, cpa: 89, status: 'Good' },
    { creative: 'Creative C - "Scale Your Operations"', impressions: 52100, clicks: 729, ctr: 1.4, conversions: 12, cpa: 156, status: 'Underperforming' },
    { creative: 'Creative D - "Drive Results Fast"', impressions: 41200, clicks: 1154, ctr: 2.8, conversions: 35, cpa: 78, status: 'Good' },
    { creative: 'Creative E - "Boost Efficiency"', impressions: 36800, clicks: 699, ctr: 1.9, conversions: 18, cpa: 112, status: 'Average' }
  ];

  const insights = [
    { label: 'Best Performing Creative', value: 'Creative A', trend: 'up', change: '+65% conversion rate' },
    { label: 'Lowest CPA', value: '$67', trend: 'up', change: '23% below target' },
    { label: 'Total Conversions', value: '138', trend: 'up', change: '+12% vs last week' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Main DemandSense Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <Header />

        {/* Response Content */}
        <div className="flex-1 flex flex-col">
          {/* Response Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link to="/ai-chat">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Chat
                  </Button>
                </Link>
                <div className="h-6 w-px bg-gray-300" />
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Creative Performance Analysis</h1>
                  <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Main Response Content */}
          <ScrollArea className="flex-1">
            <div className="max-w-6xl mx-auto p-6 space-y-8">
              {/* Query Context */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-900 mb-2">Your Question</h3>
                      <p className="text-blue-800">"Show me creative optimization insights for my LinkedIn campaigns"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Response Summary */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-900 leading-relaxed text-lg">
                  Based on your LinkedIn Ads data from the past 30 days, I've analyzed the performance of your 5 active creatives. Here's what the data reveals about your creative optimization opportunities:
                </p>
              </div>

              {/* Key Insights Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insights.map((insight, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{insight.label}</p>
                          <p className="text-3xl font-bold text-gray-900">{insight.value}</p>
                        </div>
                        <div className={`p-3 rounded-full ${
                          insight.trend === 'up' ? 'bg-green-100' : 
                          insight.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          {insight.trend === 'up' && <TrendingUp className="w-6 h-6 text-green-600" />}
                          {insight.trend === 'down' && <TrendingDown className="w-6 h-6 text-red-600" />}
                          {insight.trend === 'neutral' && <Minus className="w-6 h-6 text-gray-600" />}
                        </div>
                      </div>
                      {insight.change && (
                        <p className={`text-sm mt-2 font-medium ${
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

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Creative Performance Comparison</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <PinIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
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

              {/* Detailed Data Table */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Creative Performance Details</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold">Creative</th>
                          <th className="text-left p-3 font-semibold">Impressions</th>
                          <th className="text-left p-3 font-semibold">Clicks</th>
                          <th className="text-left p-3 font-semibold">CTR</th>
                          <th className="text-left p-3 font-semibold">Conversions</th>
                          <th className="text-left p-3 font-semibold">CPA</th>
                          <th className="text-left p-3 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{row.creative}</td>
                            <td className="p-3">{row.impressions.toLocaleString()}</td>
                            <td className="p-3">{row.clicks.toLocaleString()}</td>
                            <td className="p-3 font-medium">{row.ctr}%</td>
                            <td className="p-3 font-medium">{row.conversions}</td>
                            <td className="p-3 font-medium">${row.cpa}</td>
                            <td className="p-3">
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

              {/* Analysis Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    📊 Analysis Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Performance Overview</h4>
                      <p className="text-gray-800 leading-relaxed">
                        Your creative portfolio shows significant variation in performance, with Creative A emerging as the clear winner. The data reveals a 128% performance gap between your best and worst performing creatives, indicating substantial optimization opportunities.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Findings</h4>
                      <p className="text-gray-800 leading-relaxed">
                        Creative A demonstrates exceptional efficiency with a 3.2% CTR (60% above campaign average) and the lowest CPA at $67. In contrast, Creative C is underperforming with a 1.4% CTR and CPA of $156 - more than double your target cost per acquisition.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Budget Impact</h4>
                      <p className="text-gray-800 leading-relaxed">
                        Currently, your budget allocation doesn't align with performance. Creative A, despite driving 33% of total conversions, likely receives equal budget share. Reallocating spend could improve overall campaign ROAS by an estimated 25-30%.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Strategic Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    🎯 Strategic Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Creative Messaging Analysis</h4>
                      <p className="text-blue-900 leading-relaxed">
                        "Transform Your Business" (Creative A) resonates strongly with your target audience, suggesting transformation-focused messaging outperforms feature-based copy. This insight should inform future creative development.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Audience Alignment</h4>
                      <p className="text-blue-900 leading-relaxed">
                        The performance variance suggests different creatives appeal to different audience segments. Creative B shows promise but may need audience refinement or different placement strategies to reach its full potential.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Competitive Positioning</h4>
                      <p className="text-blue-900 leading-relaxed">
                        Your top-performing creative's 3.2% CTR significantly exceeds industry benchmarks (typically 0.9-2.1% for LinkedIn), indicating strong market positioning and message-market fit.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-xl text-green-900">💡 Actionable Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Immediate Budget Reallocation</h4>
                        <p className="text-green-800 leading-relaxed">
                          Increase Creative A budget by 40% and reduce Creative C by 60%. Expected impact: +$2,340 monthly savings with 25% more conversions.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Creative Testing Program</h4>
                        <p className="text-green-800 leading-relaxed">
                          Launch 3 variations of Creative A with different headlines. Test "Accelerate Growth", "Drive Innovation", and "Unlock Potential" messaging.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Audience Optimization</h4>
                        <p className="text-green-800 leading-relaxed">
                          Analyze Creative B's audience data - it may perform better with specific job titles or company sizes. Consider separate campaigns for different segments.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Performance Monitoring</h4>
                        <p className="text-green-800 leading-relaxed">
                          Set up automated alerts when CPA exceeds $120 or CTR drops below 2.0%. Review creative performance weekly to catch declining trends early.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">🚀 Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-2">Timeline</h4>
                        <p className="text-yellow-900 leading-relaxed">
                          Implement budget changes within 24 hours to capture immediate savings. Launch creative tests by end of week. Schedule follow-up analysis in 14 days to measure impact and refine strategy further.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-2">Expected Outcome</h4>
                        <p className="text-yellow-900 leading-relaxed">
                          These optimizations should improve overall campaign efficiency by 20-30%, reduce average CPA to $75-80, and increase monthly conversion volume by 15-20 conversions.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <Button variant="outline">
                    <Pin className="w-4 h-4 mr-2" />
                    Pin Analysis
                  </Button>
                  <Button variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Report
                  </Button>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">Was this analysis helpful?</span>
                  <Button size="sm" variant="ghost">
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default AIResponse;