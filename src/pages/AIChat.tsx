import * as React from 'react';
import { Link } from 'react-router-dom';
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
import { Command, datasets } from '@/data/commandData';
import { motion, AnimatePresence } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import ModuleHoverMenu from '@/components/chat/ModuleHoverMenu';
import { Separator } from '@/components/ui/separator';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Bookmark, 
  Sparkles,
  BarChart3,
  Users,
  TrendingUp,
  Eye,
  Target,
  Calendar,
  BrainCircuit
} from 'lucide-react';

const AIChat = () => {
  const [selectedModule, setSelectedModule] = React.useState('Auto');
  const [content, setContent] = React.useState<ContentPart[]>([]);
  const [chatHistory, setChatHistory] = React.useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [promptCategory, setPromptCategory] = React.useState('All');
  const [isCommandMenuOpen, setIsCommandMenuOpen] = React.useState(false);
  const [commandQuery, setCommandQuery] = React.useState('');
  const [chatListTab, setChatListTab] = React.useState('most-used');
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const textValue = content.length > 0 && content[content.length - 1].type === 'text' 
    ? content[content.length - 1].value 
    : '';

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
    { id: 'Auto', label: 'Auto', icon: Sparkles, data: null },
    { id: 'LinkedIn Ads', label: 'LinkedIn Ads', icon: BarChart3, data: datasets.find(d => d.name === 'LinkedIn Ads') || null },
    { id: 'Website Visitor', label: 'Website Visitor', icon: Users, data: datasets.find(d => d.name === 'Website Visitor') || null },
    { id: 'Google Ads', label: 'Google Ads', icon: BarChart3, data: datasets.find(d => d.name === 'Google Ads') || null },
    { id: 'Meta Ads', label: 'Meta Ads', icon: BarChart3, data: datasets.find(d => d.name === 'Meta Ads') || null }
  ];

  const suggestedPrompts = [
    // Performance
    { text: "Show me top performing campaigns this month", icon: TrendingUp, category: "Performance", color: "bg-green-50 border-green-200 hover:bg-green-100" },
    { text: "What are my best performing ad groups by CTR?", icon: TrendingUp, category: "Performance", color: "bg-green-50 border-green-200 hover:bg-green-100" },
    { text: "Which campaigns have the highest conversion rate?", icon: TrendingUp, category: "Performance", color: "bg-green-50 border-green-200 hover:bg-green-100" },
    { text: "Identify the top 5 keywords by performance.", icon: TrendingUp, category: "Performance", color: "bg-green-50 border-green-200 hover:bg-green-100" },
    { text: "What's the overall ROAS for my Q3 campaigns?", icon: TrendingUp, category: "Performance", color: "bg-green-50 border-green-200 hover:bg-green-100" },
    { text: "Show me performance metrics for the new product launch campaign.", icon: TrendingUp, category: "Performance", color: "bg-green-50 border-green-200 hover:bg-green-100" },
    
    // Optimization
    { text: "Which creative drove 80% of MQLs?", icon: Target, category: "Optimization", color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
    { text: "Suggest budget re-allocation for underperforming campaigns.", icon: Target, category: "Optimization", color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
    { text: "What are some negative keywords I should add based on search terms?", icon: Target, category: "Optimization", color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
    { text: "Identify ads with high impressions but low clicks for optimization.", icon: Target, category: "Optimization", color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
    { text: "Which landing pages have the lowest conversion rates?", icon: Target, category: "Optimization", color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
    { text: "Give me A/B test ideas for my lowest performing ad set.", icon: Target, category: "Optimization", color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },

    // Analysis
    { text: "Compare CPC trends vs last quarter", icon: BarChart3, category: "Analysis", color: "bg-purple-50 border-purple-200 hover:bg-purple-100" },
    { text: "Analyze the demographic performance of my main campaign.", icon: BarChart3, category: "Analysis", color: "bg-purple-50 border-purple-200 hover:bg-purple-100" },
    { text: "What's the correlation between ad spend and lead quality?", icon: BarChart3, category: "Analysis", color: "bg-purple-50 border-purple-200 hover:bg-purple-100" },
    { text: "Show me a cohort analysis of users acquired last month.", icon: BarChart3, category: "Analysis", color: "bg-purple-50 border-purple-200 hover:bg-purple-100" },
    { text: "Break down campaign performance by device type.", icon: BarChart3, category: "Analysis", color: "bg-purple-50 border-purple-200 hover:bg-purple-100" },
    { text: "What time of day are my ads most effective?", icon: BarChart3, category: "Analysis", color: "bg-purple-50 border-purple-200 hover:bg-purple-100" },

    // Visitors
    { text: "Show US-based SaaS visitors from pricing page", icon: Eye, category: "Visitors", color: "bg-orange-50 border-orange-200 hover:bg-orange-100" },
    { text: "List all enterprise companies that visited our site this week.", icon: Eye, category: "Visitors", color: "bg-orange-50 border-orange-200 hover:bg-orange-100" },
    { text: "What are the most common industries of our website visitors?", icon: Eye, category: "Visitors", color: "bg-orange-50 border-orange-200 hover:bg-orange-100" },
    { text: "Identify returning visitors from target accounts who haven't converted.", icon: Eye, category: "Visitors", color: "bg-orange-50 border-orange-200 hover:bg-orange-100" },
    { text: "Show me the user journey for visitors who came from LinkedIn Ads.", icon: Eye, category: "Visitors", color: "bg-orange-50 border-orange-200 hover:bg-orange-100" },
    { text: "Which blog posts are most popular among visitors from the tech industry?", icon: Eye, category: "Visitors", color: "bg-orange-50 border-orange-200 hover:bg-orange-100" },

    // Reporting
    { text: "Weekly performance breakdown by campaign", icon: Calendar, category: "Reporting", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100" },
    { text: "Generate a monthly report of all key metrics for the marketing team.", icon: Calendar, category: "Reporting", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100" },
    { text: "Create a summary of Q3 performance for the executive team.", icon: Calendar, category: "Reporting", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100" },
    { text: "Export a CSV of all campaign data from the last 30 days.", icon: Calendar, category: "Reporting", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100" },
    { text: "Build a dashboard comparing LinkedIn and Google Ads performance.", icon: Calendar, category: "Reporting", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100" },
    { text: "Show me a report of year-over-year growth.", icon: Calendar, category: "Reporting", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100" },

    // Conversion
    { text: "Visitor conversion funnel analysis", icon: Users, category: "Conversion", color: "bg-pink-50 border-pink-200 hover:bg-pink-100" },
    { text: "What are the top conversion paths on our website?", icon: Users, category: "Conversion", color: "bg-pink-50 border-pink-200 hover:bg-pink-100" },
    { text: "Identify the biggest drop-off points in the conversion funnel.", icon: Users, category: "Conversion", color: "bg-pink-50 border-pink-200 hover:bg-pink-100" },
    { text: "Which traffic source has the highest lead-to-customer conversion rate?", icon: Users, category: "Conversion", color: "bg-pink-50 border-pink-200 hover:bg-pink-100" },
    { text: "Analyze the conversion rate of visitors from different countries.", icon: Users, category: "Conversion", color: "bg-pink-50 border-pink-200 hover:bg-pink-100" },
    { text: "What's the average time to conversion for a new lead?", icon: Users, category: "Conversion", color: "bg-pink-50 border-pink-200 hover:bg-pink-100" }
  ];

  const filteredPrompts = (() => {
    if (promptCategory === 'All') {
      const categories = [
        "Performance",
        "Optimization",
        "Analysis",
        "Visitors",
        "Reporting",
        "Conversion",
      ];
      return categories.map(category => 
        suggestedPrompts.find(prompt => prompt.category === category)
      ).filter(p => p) as typeof suggestedPrompts;
    }
    return suggestedPrompts.filter(p => p.category === promptCategory);
  })();
  
  const savedChats = [
    { id: 2, title: "Creative optimization insights", time: "Yesterday", saved: true, isRecurring: true },
    { id: 4, title: "CPC trend analysis", time: "3 days ago", saved: true, isRecurring: false },
  ];

  const mostUsedChats = [
    { id: 1, title: "Campaign performance analysis", time: "2 hours ago" },
    { id: 3, title: "Visitor behavior patterns", time: "2 days ago" },
  ];

  const recentUnsavedChats = [
    { id: 5, title: "Visitor conversion funnel analysis", time: "4 days ago" },
    { id: 6, title: "Show US-based SaaS visitors from pricing page", time: "5 days ago" },
    { id: 7, "title": "Weekly performance breakdown by campaign", time: "6 days ago" },
  ];

  const sampleCreativeData = {
    chartData: { barData: [ { name: 'Creative A', ctr: 3.2, conversions: 45 }, { name: 'Creative B', ctr: 2.1, conversions: 28 }, { name: 'Creative C', ctr: 1.4, conversions: 12 }, { name: 'Creative D', ctr: 2.8, conversions: 35 }, { name: 'Creative E', ctr: 1.9, conversions: 18 } ] },
    tableData: [ { creative: 'Creative A - "Transform Your Business"', impressions: 45230, clicks: 1447, ctr: 3.2, conversions: 45, cpa: 67, status: 'Top Performer' }, { creative: 'Creative B - "Unlock Growth Potential"', impressions: 38940, clicks: 818, ctr: 2.1, conversions: 28, cpa: 89, status: 'Good' }, { creative: 'Creative C - "Scale Your Operations"', impressions: 52100, clicks: 729, ctr: 1.4, conversions: 12, cpa: 156, status: 'Underperforming' }, { creative: 'Creative D - "Drive Results Fast"', impressions: 41200, clicks: 1154, ctr: 2.8, conversions: 35, cpa: 78, status: 'Good' }, { creative: 'Creative E - "Boost Efficiency"', impressions: 36800, clicks: 699, ctr: 1.9, conversions: 18, cpa: 112, status: 'Average' } ],
    insights: [ { label: 'Best Performing Creative', value: 'Creative A', trend: 'up', change: '+65% conversion rate' }, { label: 'Lowest CPA', value: '$67', trend: 'up', change: '23% below target' }, { label: 'Total Conversions', value: '138', trend: 'up', change: '+12% vs last week' } ]
  };

  const sampleLeadsData = [
    { company: 'Innovate Inc.', website: 'innovate.com', industry: 'SaaS', lastVisit: '2023-10-26', source: 'LinkedIn Ads' },
    { company: 'Tech Solutions LLC', website: 'techsolutions.io', industry: 'IT Services', lastVisit: '2023-10-26', source: 'Organic' },
    { company: 'DataDriven Co.', website: 'datadriven.ai', industry: 'SaaS', lastVisit: '2023-10-25', source: 'LinkedIn Ads' },
    { company: 'CloudCorp', website: 'cloudcorp.com', industry: 'Cloud Computing', lastVisit: '2023-10-25', source: 'Direct' },
    { company: 'Synergy Systems', website: 'synergysystems.dev', industry: 'SaaS', lastVisit: '2023-10-24', source: 'LinkedIn Ads' },
  ];

  const handleSendMessage = (promptText?: string) => {
    const messageToSend = promptText ?? content.map(p => p.value).join('').trim();
    if (!messageToSend) return;
    
    const newMessage: ChatMessageData = { id: Date.now(), role: 'user', content: messageToSend };
    setChatHistory(prev => [...prev, newMessage]);
    setIsLoading(true);
    setContent([]);
    
    setTimeout(() => {
      const lowerCaseMessage = messageToSend.toLowerCase();
      const isCreativeQuery = lowerCaseMessage.includes('creative') || lowerCaseMessage.includes('optimization');
      const isVisitorQuery = lowerCaseMessage.includes('visitors from pricing page');

      let aiResponse: ChatMessageData;

      if (isVisitorQuery) {
        aiResponse = {
          id: Date.now() + 1,
          role: 'assistant',
          content: "I've identified US-based SaaS companies that visited your pricing page in the last 7 days. Here is a preview of the list. You can download the full list for your sales team.",
          leadsData: sampleLeadsData,
          closingContent: "This list is prioritized by engagement level. Let me know if you'd like to refine this audience further or push it to your CRM.",
        };
      } else if (isCreativeQuery) {
        aiResponse = {
          id: Date.now() + 1,
          role: 'assistant',
          content: "Based on your LinkedIn Ads data from the past 30 days, I've analyzed the performance of your 5 active creatives. Here's what the data reveals about your creative optimization opportunities:",
          chartData: sampleCreativeData.chartData,
          tableData: sampleCreativeData.tableData,
          insights: sampleCreativeData.insights,
          closingContent: "This analysis suggests focusing on creatives similar to 'Creative A' for future campaigns to maximize conversion rates and lower CPA. Let me know if you'd like to explore other metrics or timeframes!"
        };
      } else {
        aiResponse = {
          id: Date.now() + 1,
          role: 'assistant',
          content: "I'm analyzing your data to provide insights. Here's what I found based on your query...",
        };
      }
      
      setChatHistory(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCommandSelect = (command: Command) => {
    const newChip: ContentPart = {
      id: `chip-${Date.now()}`,
      type: 'chip',
      value: command.name,
      color: command.color,
    };
    
    setContent(currentContent => {
        const lastPart = currentContent.length > 0 ? currentContent[currentContent.length - 1] : null;

        if (!lastPart || lastPart.type !== 'text') {
            return [...currentContent, newChip, { id: 'text-new', type: 'text', value: ' ' }];
        }

        const textBeforeCommand = lastPart.value.replace(/\/\S*\s*$/, '');
        const newContent = [...currentContent.slice(0, -1)];

        if (textBeforeCommand) {
            newContent.push({ ...lastPart, value: textBeforeCommand });
        }
        
        newContent.push(newChip);
        newContent.push({ id: 'text-new', type: 'text', value: ' ' });
        
        return newContent;
    });

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

  const listVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
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
                  <Bookmark className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Saved</span>
                </div>
                <div className="space-y-2">
                  {savedChats.map(chat => (
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
                <ToggleGroup 
                  type="single" 
                  defaultValue="most-used" 
                  className="grid w-full grid-cols-2 mb-3"
                  value={chatListTab}
                  onValueChange={(value) => value && setChatListTab(value)}
                >
                  <ToggleGroupItem value="most-used">Most Used</ToggleGroupItem>
                  <ToggleGroupItem value="recent">Recent</ToggleGroupItem>
                </ToggleGroup>
                <div className="relative h-40">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={chatListTab}
                      variants={listVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute w-full space-y-2"
                    >
                      {(chatListTab === 'most-used' ? mostUsedChats : recentUnsavedChats).map(chat => (
                        <div key={chat.id} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium text-gray-900 truncate">{chat.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </ScrollArea>
          </div>
          <div className="flex-1 flex flex-col bg-gray-100">
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {modules.map(module => {
                    const Icon = module.icon;
                    const hasSubMenu = module.data && module.data.children && module.data.children.length > 0;

                    const badgeElement = (
                      <Badge 
                        variant={selectedModule === module.id ? "default" : "outline"} 
                        className={`cursor-pointer px-3 py-1 ${ selectedModule === module.id ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-100' }`} 
                        onClick={() => setSelectedModule(module.id)}
                      >
                        <Icon className="w-3 h-3 mr-1" />
                        {module.label}
                      </Badge>
                    );

                    if (hasSubMenu) {
                      return (
                        <HoverCard key={module.id} openDelay={100} closeDelay={100}>
                          <HoverCardTrigger asChild>
                            <span>{badgeElement}</span>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-56 p-0" align="start">
                            <ModuleHoverMenu items={module.data.children!} />
                          </HoverCardContent>
                        </HoverCard>
                      );
                    }

                    return badgeElement;
                  })}
                </div>
                <Link to="/memory">
                  <Button variant="outline">
                    <BrainCircuit className="w-4 h-4 mr-2" />
                    Memory
                  </Button>
                </Link>
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
                        <ToggleGroup type="single" value={promptCategory} onValueChange={(v) => v && setPromptCategory(v)} size="sm" className="flex-wrap justify-center">
                          <ToggleGroupItem value="All">All</ToggleGroupItem>
                          <ToggleGroupItem value="Performance">Performance</ToggleGroupItem>
                          <ToggleGroupItem value="Optimization">Optimization</ToggleGroupItem>
                          <ToggleGroupItem value="Analysis">Analysis</ToggleGroupItem>
                          <ToggleGroupItem value="Visitors">Visitors</ToggleGroupItem>
                          <ToggleGroupItem value="Reporting">Reporting</ToggleGroupItem>
                          <ToggleGroupItem value="Conversion">Conversion</ToggleGroupItem>
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