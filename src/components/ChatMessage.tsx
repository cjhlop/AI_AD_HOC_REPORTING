import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Bot, 
  User, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  RefreshCw, 
  Repeat, 
  TrendingUp, 
  TrendingDown,
  Check,
  ChevronDown
} from 'lucide-react';

export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  icon?: React.ElementType;
  chartData?: {
    barData: any[];
  };
  tableData?: any[];
  insights?: readonly {
    label: string;
    value: string;
    trend: 'up' | 'down';
    change: string;
  }[];
  closingContent?: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const [copied, setCopied] = React.useState(false);
  const Icon = message.icon || (message.role === 'user' ? User : Bot);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderInsight = (insight: Message['insights'][number]) => {
    const TrendIcon = insight.trend === 'up' ? TrendingUp : TrendingDown;
    const trendColor = insight.trend === 'up' ? 'text-green-600' : 'text-red-600';
    return (
      <div key={insight.label} className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500">{insight.label}</p>
        <p className="text-2xl font-bold text-gray-900">{insight.value}</p>
        <div className={`flex items-center text-sm ${trendColor}`}>
          <TrendIcon className="w-4 h-4 mr-1" />
          <span>{insight.change}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
      {message.role === 'assistant' && (
        <Avatar className="w-8 h-8 border">
          <AvatarFallback className="bg-blue-100">
            <Bot className="w-5 h-5 text-blue-600" />
          </AvatarFallback>
        </Avatar>
      )}
      <div className={`flex flex-col gap-2 max-w-[85%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl ${message.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border'}`}>
          <div className="flex items-center gap-2 mb-2">
            {message.role === 'user' && Icon && <Icon className="w-4 h-4" />}
            <p className="font-semibold">{message.role === 'user' ? 'You' : 'AI Co-Pilot'}</p>
          </div>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {message.chartData && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Creative Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={message.chartData.barData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: '14px' }} />
                  <Bar dataKey="ctr" fill="#3b82f6" name="CTR (%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conversions" fill="#8b5cf6" name="Conversions" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {message.insights && (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {message.insights.map(renderInsight)}
          </div>
        )}

        {message.tableData && (
          <Card className="w-full">
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
                  {message.tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.creative}</TableCell>
                      <TableCell>{row.impressions.toLocaleString()}</TableCell>
                      <TableCell>{row.clicks.toLocaleString()}</TableCell>
                      <TableCell>{row.ctr.toFixed(1)}</TableCell>
                      <TableCell>{row.conversions}</TableCell>
                      <TableCell>{row.cpa}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          row.status === 'Top Performer' ? 'bg-green-100 text-green-800' :
                          row.status === 'Underperforming' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {row.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {message.closingContent && (
          <div className="px-4 py-3 rounded-2xl bg-white text-gray-800 rounded-bl-none border w-full">
            <p className="whitespace-pre-wrap">{message.closingContent}</p>
          </div>
        )}

        {message.role === 'assistant' && (
          <div className="flex items-center gap-2 mt-1">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
              <ThumbsUp className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
              <ThumbsDown className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900" onClick={handleCopy}>
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Popover>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 text-gray-500 hover:text-gray-900"
                      >
                        <Repeat className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Recurring</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Recurring Chat</h4>
                    <p className="text-sm text-muted-foreground">
                      This chat will run automatically based on the schedule.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <span className="text-sm font-medium">Frequency</span>
                      <Button variant="outline" className="col-span-2 h-8">
                        Weekly <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <span className="text-sm font-medium">Day</span>
                      <Button variant="outline" className="col-span-2 h-8">
                        Monday <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      {message.role === 'user' && (
        <Avatar className="w-8 h-8 border">
          <AvatarFallback>
            <User className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};