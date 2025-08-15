import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ResizableChart from '@/components/ResizableChart';
import { 
  Plus, 
  Filter, 
  Calendar, 
  Download,
  Share,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

const Dashboards = () => {
  // Sample data for different chart types
  const creativePerformanceData = [
    { name: 'Creative A', ctr: 3.2, conversions: 45 },
    { name: 'Creative B', ctr: 2.1, conversions: 28 },
    { name: 'Creative C', ctr: 1.4, conversions: 12 },
    { name: 'Creative D', ctr: 2.8, conversions: 35 },
    { name: 'Creative E', ctr: 1.9, conversions: 18 }
  ];

  const campaignTrendsData = [
    { name: 'Week 1', value: 2400 },
    { name: 'Week 2', value: 1398 },
    { name: 'Week 3', value: 9800 },
    { name: 'Week 4', value: 3908 },
    { name: 'Week 5', value: 4800 },
    { name: 'Week 6', value: 3800 }
  ];

  const audienceSegmentData = [
    { name: 'Enterprise', value: 400 },
    { name: 'Mid-Market', value: 300 },
    { name: 'SMB', value: 200 },
    { name: 'Startup', value: 100 }
  ];

  const conversionFunnelData = [
    { name: 'Impressions', ctr: 100000, conversions: 100 },
    { name: 'Clicks', ctr: 3200, conversions: 85 },
    { name: 'Visits', ctr: 2800, conversions: 70 },
    { name: 'Leads', ctr: 450, conversions: 55 },
    { name: 'Customers', ctr: 89, conversions: 40 }
  ];

  const cpcTrendsData = [
    { name: 'Jan', value: 4.2 },
    { name: 'Feb', value: 3.8 },
    { name: 'Mar', value: 4.5 },
    { name: 'Apr', value: 3.9 },
    { name: 'May', value: 4.1 },
    { name: 'Jun', value: 3.7 }
  ];

  const visitorSourcesData = [
    { name: 'LinkedIn Ads', value: 45 },
    { name: 'Organic Search', value: 25 },
    { name: 'Direct', value: 15 },
    { name: 'Referral', value: 10 },
    { name: 'Email', value: 5 }
  ];

  const creativeInsights = [
    { label: 'Best CTR', value: '3.2%', trend: 'up' },
    { label: 'Total Conversions', value: '138', trend: 'up' },
    { label: 'Avg CPA', value: '$89', trend: 'down' }
  ];

  const campaignInsights = [
    { label: 'Weekly Growth', value: '+12%', trend: 'up' },
    { label: 'Peak Performance', value: 'Week 3', trend: 'neutral' }
  ];

  const conversionInsights = [
    { label: 'Conversion Rate', value: '2.8%', trend: 'up' },
    { label: 'Drop-off Point', value: 'Visits→Leads', trend: 'down' }
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Fixed Main DemandSense Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Dashboard Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Marketing Dashboards</h1>
                <p className="text-muted-foreground">Interactive analytics from your AI conversations</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last 30 days
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Conversions</p>
                      <p className="text-2xl font-bold text-foreground">1,247</p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">+12% vs last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Average CPA</p>
                      <p className="text-2xl font-bold text-foreground">$89</p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full">
                      <TrendingDown className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">-8% vs last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Click-through Rate</p>
                      <p className="text-2xl font-bold text-foreground">2.4%</p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs text-primary mt-1">+5% vs last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Campaigns</p>
                      <p className="text-2xl font-bold text-foreground">24</p>
                    </div>
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Minus className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">No change</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Resizable Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-min">
            <div className="lg:col-span-2">
              <ResizableChart
                title="Creative Performance Analysis"
                type="bar"
                data={creativePerformanceData}
                insights={creativeInsights}
                initialWidth={600}
                initialHeight={400}
              />
            </div>

            <div>
              <ResizableChart
                title="Audience Segments"
                type="pie"
                data={audienceSegmentData}
                initialWidth={400}
                initialHeight={400}
              />
            </div>

            <div>
              <ResizableChart
                title="Campaign Trends"
                type="line"
                data={campaignTrendsData}
                insights={campaignInsights}
                initialWidth={400}
                initialHeight={350}
              />
            </div>

            <div>
              <ResizableChart
                title="CPC Trends Over Time"
                type="line"
                data={cpcTrendsData}
                initialWidth={400}
                initialHeight={350}
              />
            </div>

            <div>
              <ResizableChart
                title="Visitor Traffic Sources"
                type="pie"
                data={visitorSourcesData}
                initialWidth={400}
                initialHeight={350}
              />
            </div>

            <div className="lg:col-span-2">
              <ResizableChart
                title="Conversion Funnel Analysis"
                type="bar"
                data={conversionFunnelData}
                insights={conversionInsights}
                initialWidth={600}
                initialHeight={400}
              />
            </div>
          </div>

          {/* Dashboard Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-900 mb-2">💡 Dashboard Tips</h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Drag the bottom-right corner of any chart to resize it</li>
              <li>• Click the maximize button to view charts in full screen</li>
              <li>• Use the refresh button to update data in real-time</li>
              <li>• Pin important charts to keep them visible</li>
              <li>• Export individual charts or the entire dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboards;