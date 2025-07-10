import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, TrendingUp, Bot, User, Repeat } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, BarChart as RechartsBarChart } from 'recharts';
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
  chartData?: {
    readonly barData: readonly any[];
  };
  tableData?: readonly any[];
  insights?: readonly { readonly label: string; readonly value: string; readonly trend: 'up' | 'down'; readonly change: string }[];
  closingContent?: string;
}

interface ChatMessageProps {
  message: Message;
}

const InsightCard = ({ insight }: { insight: { label: string; value: string; trend: 'up' | 'down'; change: string } }) => (
  <Card className="bg-gray-50/50">
    <CardContent className="p-4">
      <p className="text-sm text-gray-500 mb-1">{insight.label}</p>
      <p className="text-xl font-bold text-gray-900">{insight.value}</p>
      <div className="flex items-center text-xs text-gray-500 mt-1">
        <TrendingUp className={`w-3 h-3 mr-1 ${insight.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
        <span>{insight.change}</span>
      </div>
    </CardContent>
  </Card>
);

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { role, content, icon: MsgIcon, chartData, tableData, insights, closingContent } = message;
  const isUser = role === 'user';
  const Icon = isUser ? (MsgIcon || User) : Bot;
  const avatarBg = isUser ? 'bg-gray-200' : 'bg-blue-100';
  const avatarIconColor = isUser ? 'text-gray-600' : 'text-blue-600';

  return (
    <TooltipProvider>
      <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
        {!isUser && (
          <Avatar className={`h-9 w-9 ${avatarBg}`}>
            <AvatarFallback className={avatarBg}>
              <Icon className={`h-5 w-5 ${avatarIconColor}`} />
            </AvatarFallback>
          </Avatar>
        )}
        <div className={`flex flex-col gap-2 max-w-full ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-lg p-4 text-sm ${isUser ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="prose prose-sm max-w-none">
                {content}
              </div>
              {!isUser && (
                <Popover>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0 text-gray-500 hover:text-gray-900 -mr-2 -mt-2"
                        >
                          <Repeat className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Recurring</p>
                    </TooltipContent>
                  </Tooltip>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Set Recurring</h4>
                        <p className="text-sm text-muted-foreground">
                          Schedule this query to run automatically.
                        </p>
                      </div>
                      {/* Add recurring options form here */}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>

          {chartData && (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart className="w-5 h-5 mr-2 text-gray-600" />
                  Creative Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsBarChart data={[...chartData.barData]} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`}/>
                    <RechartsTooltip />
                    <Legend wrapperStyle={{ fontSize: "14px" }}/>
                    <Bar dataKey="ctr" fill="#3b82f6" name="CTR" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {tableData && (
            <Card className="w-full">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Creative</TableHead>
                      <TableHead>Impressions</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Conversions</TableHead>
                      <TableHead>CPA</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row: any, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium max-w-xs truncate">{row.creative}</TableCell>
                        <TableCell>{row.impressions.toLocaleString()}</TableCell>
                        <TableCell>{row.clicks.toLocaleString()}</TableCell>
                        <TableCell>{row.ctr}%</TableCell>
                        <TableCell>{row.conversions}</TableCell>
                        <TableCell>${row.cpa}</TableCell>
                        <TableCell>
                          <Badge variant={row.status === 'Top Performer' ? 'default' : 'secondary'} className={row.status === 'Top Performer' ? 'bg-green-100 text-green-800' : ''}>
                            {row.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {insights && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {insights.map((insight, index) => (
                <InsightCard key={index} insight={insight} />
              ))}
            </div>
          )}

          {closingContent && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm w-full">
              <p>{closingContent}</p>
            </div>
          )}
        </div>
        {isUser && (
          <Avatar className={`h-9 w-9 ${avatarBg}`}>
            <AvatarFallback className={avatarBg}>
              <Icon className={`h-5 w-5 ${avatarIconColor}`} />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </TooltipProvider>
  );
};