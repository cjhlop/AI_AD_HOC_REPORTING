import { BarChart2, Users, Database, LineChart, PieChart, Table } from 'lucide-react';

export interface Command {
  name: string;
  description?: string;
  icon?: React.ElementType;
  color?: 'blue' | 'multicolor' | 'indigo' | 'orange' | 'gray';
  children?: Command[];
  type: 'dataset' | 'metric' | 'folder' | 'chart';
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
    { name: 'Bar Chart', type: 'chart', icon: BarChart2, color: 'gray' },
    { name: 'Line Chart', type: 'chart', icon: LineChart, color: 'gray' },
    { name: 'Pie Chart', type: 'chart', icon: PieChart, color: 'gray' },
    { name: 'Table', type: 'chart', icon: Table, color: 'gray' },
];