import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ChatMessage, Message as ChatMessageData } from '@/components/ChatMessage';
import TypingIndicator from '@/components/chat/TypingIndicator';
import CommandMenu from '@/components/CommandMenu';
import { ChatInput, ContentPart } from '@/components/chat/ChatInput';
import { Command } from '@/data/commandData';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Pin, 
  Sparkles,
  BarChart3,
  Users,
  History,
  TrendingUp,
  Eye,
  Target,
  Calendar
} from 'lucide-react';

const AIChat = () => {
  const [selectedModule, setSelectedModule] = React.useState('Auto');
  const [content, setContent] = React.useState<ContentPart[]>([]);
  const [chatHistory, setChatHistory] = React.useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [promptCategory, setPromptCategory] = React.useState('All');
  const [isCommandMenuOpen, setIsCommandMenuOpen] = React.useState(false);
  const [commandQuery, setCommandQuery] = React.useState('');
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const textValue = content.find(p => p.type === 'text')?.value || '';

  React.useEffect(() => {
    const triggerRegex = /(^|\s)\/(\S*)$/;
    const match = textValue.match(triggerRegex);
    
    if (match) {
      setIsCommandMenuOpen(true);
      setCommandQuery(match[2] || '');
    } else {
      setIsCommandMenuOpen(false);
      setCommandQuery('');
    }
  }, [textValue]);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistory, isLoading]);

  const modules = [
    { id: 'Auto', label: 'Auto', icon: Sparkles },
    { id: 'LinkedIn Ads', label: 'LinkedIn Ads', icon: BarChart3 },
    { id: 'Website Visitor', label: 'Website Visitor', icon: Users },
    { id: 'Google Ads', label: 'Google Ads', icon: BarChart3 },
    { id: 'Meta Ads', label: 'Meta Ads', icon: BarChart3 }
  ];

  const suggestedPrompts = [
    { text: "Show me top performing campaigns this month", icon: TrendingUp, category: "Performance", color: "bg-green-50 border-green-200 hover:bg-green-100" },
    { text: "Which creative drove 80% of MQLs?", icon: Target, category: "Optimization", color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
    { text: "Compare CPC trends vs last quarter", icon: BarChart3, category: "Analysis", color: "bg-purple-50 border-purple-200 hover:bg-purple-100" },
    { text: "Show US-based SaaS visitors from pricing page", icon: Eye, category: "Visitors", color: "bg-orange-50 border-orange-200 hover:bg-orange-100" },
    { text: "Weekly performance breakdown by campaign", icon: Calendar, category: "Reporting", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100" },
    { text: "Visitor conversion funnel analysis", icon: Users, category: "Conversion", color: "bg-pink-50 border-pink-200 hover:bg-pink-100" }
  ];

  const filteredPrompts = suggestedPrompts.filter(p => promptCategory === 'All' || p.category === promptCategory);
  const recentChats = [
    { id: 1, title: "Campaign performance analysis", time: "2 hours ago", pinned: false, isRecurring: false },
    { id: 2, title: "Creative optimization insights", time: "Yesterday", pinned: true, icon: Target, isRecurring: true },
    { id: 3, title: "Visitor behavior patterns", time: "2 days ago", pinned: false, isRecurring: false },
    { id: 4, title: "CPC trend analysis", time: "3 days ago", pinned: true, icon: BarChart3, isRecurring: false },
  ];
  const sampleCreativeData = {
    chartData: { barData: [ { name: 'Creative A', ctr: 3.2, conversions: 45 }, { name: 'Creative B', ctr: 2.1, conversions: 28 }, { name: 'Creative C', ctr: 1.4, conversions: 12 }, { name: 'Creative D', ctr: 2.8, conversions: 35 }, { name: 'Creative E', ctr: 1.9, conversions: 18 } ] },
    tableData: [ { creative: 'Creative A - "Transform Your Business"', impressions: 45230, clicks: 1447, ctr: 3.2, conversions: 45, cpa: 67, status: 'Top Performer' }, { creative: 'Creative B - "Unlock Growth Potential"', impressions: 38940, clicks: 818, ctr: 2.1, conversions: 28, cpa: 89, status: 'Good' }, { creative: 'Creative C - "Scale Your Operations"', impressions: 52100, clicks: 729, ctr: 1.4, conversions: 12, cpa: 156, status: 'Underperforming' }, { creative: 'Creative D - "Drive Results Fast"', impressions: 41200, clicks: 1154, ctr: 2.8, conversions: 35, cpa: 78, status: 'Good' }, { creative: 'Creative E - "Boost Efficiency"', impressions: 36800, clicks: 699, ctr: 1.9, conversions: 18, cpa: 112, status: 'Average' } ],
    insights: [ { label: 'Best Performing Creative', value: 'Creative A', trend: 'up', change: '+65% conversion rate' }, { label: 'Lowest CPA', value: '$67', trend: 'up', change: '23% below target' }, { label: 'Total Conversions', value: '138', trend: 'up', change: '+12% vs last week' } ]
  };

  const handleSendMessage = (promptText?: string) => {
    const messageToSend = promptText ?? content.map(p => p.value).join(' ').trim();
    if (!messageToSend) return;
    
    const newMessage: ChatMessageData = { id: Date.now(), role: 'user', content: messageToSend };
    setChatHistory(prev => [...prev, newMessage]);
    setIsLoading(true);
    setContent([]);
    
    setTimeout(() => {
      const isCreativeQuery = messageToSend.toLowerCase().includes('creative') || messageToSend.toLowerCase().includes('optimization');
      const aiResponse: ChatMessageData = {
        id: Date.now() + 1,
        role: 'assistant',
        content: isCreativeQuery ? "Based on your LinkedIn Ads data from the past 30 days, I've analyzed the performance of your 5 active creatives. Here's what the data reveals about your creative optimization opportunities:" : "I'm analyzing your data to provide insights. Here's what I found based on your query...",
        chartData: isCreativeQuery ? sampleCreativeData.chartData : undefined,
        tableData: isCreativeQuery ? sampleCreativeData.tableData : undefined,
        insights: isCreativeQuery ? sampleCreativeData.insights : undefined,
        closingContent: isCreativeQuery ? "This analysis suggests focusing on creatives similar to 'Creative A' for future campaigns to maximize conversion rates and lower CPA. Let me know if you'd like to explore other metrics or timeframes!" : undefined,
      };
      setChatHistory(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCommandSelect = (command: Command) => {
    const newChip: ContentPart = {
      id: Date.now().toString(),
      type: 'chip',
      value: command.name,
      color: command.color,
    };
    
    const textPart = content.find(p => p.type === 'text');
    if (!textPart) return;

    const newTextValue = textPart.value.replace(/\/\S*$/, '');
    const chipContent = content.filter(p => p.type === 'chip');
    
    setContent([
      ...chipContent, 
      newChip, 
      { id: 'text', type: 'text', value: newTextValue.trim() + ' ' }
    ]);

    setIsCommandMenuOpen(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const loadCreativeOptimizationChat = () => {
    const userMessage: ChatMessageData = { id: Date.now(), role: 'user', content: "Show me creative optimization insights for my LinkedIn campaigns" };
    const aiResponse: ChatMessageData = {
      id: Date.now() + 1,
      role: 'assistant',
      content: "Based on your LinkedIn Ads data from the past 30 days, I've analyzed the performance of your 5 active creatives. Here's what the data reveals about your creative optimization opportunities:",
      chartData: sampleCreativeData.chartData,
      tableData: sampleCreativeData.tableData,
      insights: sampleCreativeData.insights,
      closingContent: "This analysis suggests focusing on creatives similar to 'Creative A' for future campaigns to maximize conversion rates and lower CPA. Let me know if you'd like to explore other metrics or timeframes!"
    };
    setChatHistory([userMessage, aiResponse]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">AI Co-Pilot</h2>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => setChatHistory([])}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search chats..." className="pl-10" />
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Pin className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Pinned</span>
                </div>
                <div className="space-y-2">
                  {recentChats.filter(chat => chat.pinned).map(chat => (
                    <div key={chat.id} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100" onClick={() => chat.title === "Creative optimization insights" && loadCreativeOptimizationChat()}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{chat.title}</p>
                        {chat.isRecurring && <Badge variant="secondary">Recurring</Badge>}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center mb-3">
                  <History className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Recent</span>
                </div>
                <div className="space-y-2">
                  {recentChats.filter(chat => !chat.pinned).map(chat => (
                    <div key={chat.id} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium text-gray-900 truncate">{chat.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
          <div className="flex-1 flex flex-col bg-gray-100">
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                {modules.map(module => {
                  const Icon = module.icon;
                  return (
                    <Badge key={module.id} variant={selectedModule === module.id ? "default" : "outline"} className={`cursor-pointer px-3 py-1 ${ selectedModule === module.id ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-100' }`} onClick={() => setSelectedModule(module.id)}>
                      <Icon className="w-3 h-3 mr-1" />
                      {module.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
              {chatHistory.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
                  <div className="text-center max-w-4xl">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquare className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to DemandSense AI Co-Pilot</h3>
                    <p className="text-gray-600 mb-8">Ask questions about your LinkedIn Ads performance and WebID visitor analytics.</p>
                    <div className="mb-4">
                      <div className="flex justify-center gap-4 mb-4">
                        <ToggleGroup type="single" value={promptCategory} onValueChange={(v) => v && setPromptCategory(v)} size="sm">
                          <ToggleGroupItem value="All">All</ToggleGroupItem>
                          <ToggleGroupItem value="Performance">Performance</ToggleGroupItem>
                          <ToggleGroupItem value="Optimization">Optimization</ToggleGroupItem>
                          <ToggleGroupItem value="Analysis">Analysis</ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {filteredPrompts.map((prompt, index) => {
                        const Icon = prompt.icon;
                        return (
                          <Card key={index} className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 ${prompt.color}`} onClick={() => handleSendMessage(prompt.text)}>
                            <CardContent className="p-5">
                              <div className="flex items-center space-x-2 mb-3">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                  <Icon className="w-4 h-4 text-gray-600" />
                                </div>
                                <Badge variant="secondary" className="text-xs px-2 py-1">{prompt.category}</Badge>
                              </div>
                              <p className="text-sm text-gray-800 font-medium leading-relaxed text-left">{prompt.text}</p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <ScrollArea className="flex-1" ref={scrollAreaRef}>
                  <div className="space-y-6 max-w-5xl mx-auto p-6">
                    {chatHistory.map(msg => ( <ChatMessage key={msg.id} message={msg} /> ))}
                    {isLoading && <TypingIndicator />}
                  </div>
                </ScrollArea>
              )}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="max-w-5xl mx-auto">
                  <div className="relative">
                    {isCommandMenuOpen && <CommandMenu onSelect={handleCommandSelect} query={commandQuery} />}
                    <div className="relative">
                      <ChatInput
                        ref={inputRef}
                        content={content}
                        setContent={setContent}
                        placeholder="Ask about your campaigns, or type '/' for commands..."
                        onSendMessage={() => handleSendMessage()}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">AI can make mistakes. Verify important information.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;