import { BarChart2, Users, Database, LineChart, PieChart, Table, Map, AreaChart, BarChartHorizontal, BarChartBig, PieChart as PieChartIcon, ScatterChart, TrendingUp } from 'lucide-react';

export interface Command {
  name: string;
  description?: string;
  icon?: React.ElementType;
  color?: 'blue' | 'multicolor' | 'indigo' | 'orange' | 'gray';
  children?: Command[];
  type: 'dataset' | 'metric' | 'folder' | 'chart';
  previewImage?: string;
}

// Mock data for deep nesting
const adCreatives = [
  { name: 'Creative 1: "Boost Your ROI"', type: 'dataset' as const },
  { name: 'Creative 2: "New Features Alert"', type: 'dataset' as const },
  { name: 'Creative 3: "Q4 Holiday Special"', type: 'dataset' as const },
];

const campaigns = [
  { name: 'Q4 Lead Gen Campaign', type: 'folder' as const, children: adCreatives },
  { name: 'Brand Awareness Q4', type: 'folder' as const, children: adCreatives },
];

const campaignGroups = [
  { name: 'US & Canada Campaigns', type: 'folder' as const, children: campaigns },
  { name: 'EMEA Campaigns', type: 'folder' as const, children: campaigns },
];

export const datasets: Command[] = [
  {
    name: 'LinkedIn Ads',
    description: 'Select LinkedIn Ads data',
    icon: BarChart2,
    type: 'folder',
    color: 'blue',
    children: campaignGroups,
  },
  {
    name: 'Google Ads',
    description: 'Select Google Ads data',
    icon: BarChart2,
    type: 'folder',
    color: 'multicolor',
    children: [
        { name: 'Search Campaign 2024', type: 'folder', children: [
            { name: 'Ad Group - Keywords', type: 'folder', children: adCreatives },
            { name: 'Ad Group - Retargeting', type: 'folder', children: adCreatives },
        ]},
    ],
  },
  {
    name: 'Meta Ads',
    description: 'Select Meta Ads data',
    icon: BarChart2,
    type: 'folder',
    color: 'indigo',
    children: [
        { name: 'Holiday Sale Campaign', type: 'folder', children: [
            { name: 'Ad Set - US', type: 'folder', children: adCreatives },
            { name: 'Ad Set - CA', type: 'folder', children: adCreatives },
        ]},
    ],
  },
  {
    name: 'Website Visitor',
    description: 'Insert Website Visitor data',
    icon: Users,
    type: 'dataset',
    color: 'orange',
  },
];

export const metrics: Command[] = [
  { name: 'Impressions', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Clicks', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Click-Through Rate (CTR)', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Cost per Click (CPC)', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Cost per 1,000 Impressions (CPM)', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Conversions', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Conversion Rate (CVR)', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Cost per Acquisition (CPA)', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Spend', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Return on Ad Spend (ROAS)', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Return on Investment (ROI)', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Engagements', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Engagement Rate', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Video Views', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Cost per Video View', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Cost per Lead (CPL)', type: 'metric', icon: Database, color: 'gray' },
  { name: 'Bounce Rate', type: 'metric', icon: Database, color: 'gray' },
];

export const charts: Command[] = [
  {
    name: 'Bar Charts',
    type: 'folder',
    icon: BarChart2,
    children: [
      { name: 'Bar Chart', type: 'chart', previewImage: '/chart-previews/bar_chart.png' },
      { name: 'Grouped Bar', type: 'chart', previewImage: '/chart-previews/grouped_bar_chart.png' },
      { name: 'Stacked Bar', type: 'chart', previewImage: '/chart-previews/stacked_bar_chart.png' },
      { name: 'Horizontal Bar', type: 'chart', previewImage: '/chart-previews/horizontal_bar_chart.png' },
    ],
  },
  {
    name: 'Line Charts',
    type: 'folder',
    icon: LineChart,
    children: [
      { name: 'Line Chart', type: 'chart', previewImage: '/chart-previews/line_chart.png' },
      { name: 'Multi-line', type: 'chart', previewImage: '/chart-previews/multi_line_chart.png' },
      { name: 'Area Chart', type: 'chart', previewImage: '/chart-previews/area_chart.png' },
      { name: 'Step Chart', type: 'chart', previewImage: '/chart-previews/step_chart.png' },
    ],
  },
  {
    name: 'Scatter Plots',
    type: 'folder',
    icon: ScatterChart,
    children: [
      { name: 'Scatter Plot', type: 'chart', previewImage: '/chart-previews/scatter_plot.png' },
      { name: 'Bubble Chart', type: 'chart', previewImage: '/chart-previews/bubble_chart.png' },
    ],
  },
  {
    name: 'Pie Charts',
    type: 'folder',
    icon: PieChartIcon,
    children: [
      { name: 'Pie Chart', type: 'chart', previewImage: '/chart-previews/pie_chart.png' },
      { name: 'Exploded Pie', type: 'chart', previewImage: '/chart-previews/exploded_pie_chart.png' },
      { name: 'Multiple Pie', type: 'chart', previewImage: '/chart-previews/multiple_pie_chart.png' },
    ],
  },
  {
    name: 'Advanced',
    type: 'folder',
    icon: TrendingUp,
    children: [
      { name: 'Maps', type: 'chart', previewImage: '/chart-previews/map_chart.png' },
      { name: 'Mixed Charts', type: 'chart', previewImage: '/chart-previews/mixed_chart.png' },
      { name: 'Heat Maps', type: 'chart', previewImage: '/chart-previews/heatmap_chart.png' },
      { name: 'Metrics & KPIs', type: 'chart', previewImage: '/chart-previews/metrics_chart.png' },
    ],
  },
];