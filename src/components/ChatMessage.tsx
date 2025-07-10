import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Copy, ThumbsUp, ThumbsDown, MoreHorizontal, Target, BarChart3, Users, Eye, Calendar, TrendingUp, RefreshCw } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart as RechartsBarChart } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from './ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  icon?: React.ElementType;
  chartData?: any;
  tableData?: any[];
  insights?: any[];
  closingContent?: string;
}

interface ChatMessageProps {
  message: Message;
}

const InsightCard = ({ insight }: { insight: { label: string, value: string, trend: string, change: string } }) => (
  <Card className="flex-1">
    <CardContent className="p-4">
      <p className="text-sm text-gray-500 mb-1">{insight.label}</p>
      <p className="text-2xl font-bold">{insight.value}</p>
      <div className={`text-xs flex items-center ${insight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {insight.change}
      </div>
    </CardContent>
  </Card>
);

const ChatMessageActions = () => (
  <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
    <Button variant="ghost" size="icon" className="h-7 w-7">
      <Copy className="w-4 h-4 text-gray-500" />
    </Button>
    <Button variant="ghost" size="icon" className="h-7 w-7">
      <ThumbsUp className="w-4 h-4 text-gray-500" />
    </Button>
    <Button variant="ghost" size="icon" className="h-7 w-7">
      <ThumbsDown className="w-4 h-4 text-gray-500" />
    </Button>
    
    <TooltipProvider>
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Recurring</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="w-60 p-2">
          <div className="text-sm">
            <p className="font-semibold mb-1">Set as recurring</p>
            <p className="text-xs text-gray-500 mb-2">Schedule this query to run automatically.</p>
            <Button size="sm" className="w-full">Schedule</Button>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>

    <Button variant="ghost" size="icon" className="h-7 w-7">
      <MoreHorizontal className="w-4 h-4 text-gray-500" />
    </Button>
  </div>
);

const iconMap: { [key: string]: React.ElementType } = {
  "TrendingUp": TrendingUp,
  "Target": Target,
  "BarChart3": BarChart3,
  "Eye": Eye,
  "Calendar": Calendar,
  "Users": Users,
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const { role, content, icon: Icon, chartData, tableData, insights, closingContent } = message;
  const isUser = role === 'user';

  const getIconFromName = (name: string) => {
    return iconMap[name] || BarChart;
  }

  const UserIcon = typeof Icon === 'string' ? getIconFromName(Icon) : Icon;

  return (
    <div className={`flex items-start space-x-4 group ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl max-w-2xl ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-2">
            {isUser && UserIcon && <UserIcon className="w-4 h-4" />}
            <p className="leading-relaxed">{content}</p>
          </div>
        </div>
        {!isUser && (
          <>
            {insights && (
              <div className="mt-4 flex space-x-4 w-full">
                {insights.map((insight, index) => <InsightCard key={index} insight={insight} />)}
              </div>
            )}
            {chartData && (
              <Card className="mt-4 w-full">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Creative CTR & Conversions</h4>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <RechartsBarChart data={chartData.barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Bar dataKey="ctr" fill="#3b82f6" name="CTR (%)" />
                        <Bar dataKey="conversions" fill="#82ca9d" name="Conversions" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
            {tableData && (
              <Card className="mt-4 w-full">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Creative</TableHead>
                        <TableHead>Impressions</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>CTR (%)</TableHead>
                        <TableHead>Conversions</TableHead>
                        <TableHead>CPA ($)</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{row.creative}</TableCell>
                          <TableCell>{row.impressions.toLocaleString()}</TableCell>
                          <TableCell>{row.clicks.toLocaleString()}</TableCell>
                          <TableCell>{row.ctr}</TableCell>
                          <TableCell>{row.conversions}</TableCell>
                          <TableCell>{row.cpa}</TableCell>
                          <TableCell>
                            <Badge variant={row.status === 'Top Performer' ? 'default' : 'secondary'}
                              className={row.status === 'Top Performer' ? 'bg-green-100 text-green-800' : row.status === 'Underperforming' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}
                            >{row.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
            {closingContent && (
              <div className="mt-4 px-4 py-3 rounded-2xl bg-white border border-gray-200 max-w-2xl">
                <p className="leading-relaxed text-gray-900">{closingContent}</p>
              </div>
            )}
            <ChatMessageActions />
          </>
        )}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};