import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Pin, 
  Send,
  Sparkles,
  BarChart3,
  Users,
  History
} from 'lucide-react';

const AIChat = () => {
  const [selectedModule, setSelectedModule] = useState('Auto');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const modules = [
    { id: 'Auto', label: 'Auto', icon: Sparkles },
    { id: 'LinkedIn Ads', label: 'LinkedIn Ads', icon: BarChart3 },
    { id: 'WebID', label: 'WebID', icon: Users }
  ];

  const suggestedPrompts = [
    "Show me top performing campaigns this month",
    "Which creative drove 80% of MQLs?",
    "Compare CPC trends vs last quarter",
    "Show US-based SaaS visitors from pricing page",
    "Weekly performance breakdown by campaign",
    "Visitor conversion funnel analysis"
  ];

  const recentChats = [
    { id: 1, title: "Campaign performance analysis", time: "2 hours ago", pinned: false },
    { id: 2, title: "Creative optimization insights", time: "Yesterday", pinned: true },
    { id: 3, title: "Visitor behavior patterns", time: "2 days ago", pinned: false },
    { id: 4, title: "CPC trend analysis", time: "3 days ago", pinned: true },
  ];

  // Sample data for creative optimization insights
  const sampleCreativeData = {
    chartData: {
      barData: [
        { name: 'Creative A', ctr: 3.2, conversions: 45 },
        { name: 'Creative B', ctr: 2.1, conversions: 28 },
        { name: 'Creative C', ctr: 1.4, conversions: 12 },
        { name: 'Creative D', ctr: 2.8, conversions: 35 },
        { name: 'Creative E', ctr: 1.9, conversions: 18 }
      ]
    },
    tableData: [
      { creative: 'Creative A - "Transform Your Business"', impressions: 45230, clicks: 1447, ctr: 3.2, conversions: 45, cpa: 67, status: 'Top Performer' },
      { creative: 'Creative B - "Unlock Growth Potential"', impressions: 38940, clicks: 818, ctr: 2.1, conversions: 28, cpa: 89, status: 'Good' },
      { creative: 'Creative C - "Scale Your Operations"', impressions: 52100, clicks: 729, ctr: 1.4, conversions: 12, cpa: 156, status: 'Underperforming' },
      { creative: 'Creative D - "Drive Results Fast"', impressions: 41200, clicks: 1154, ctr: 2.8, conversions: 35, cpa: 78, status: 'Good' },
      { creative: 'Creative E - "Boost Efficiency"', impressions: 36800, clicks: 699, ctr: 1.9, conversions: 18, cpa: 112, status: 'Average' }
    ],
    insights: [
      { label: 'Best Performing Creative', value: 'Creative A', trend: 'up', change: '+65% conversion rate' },
      { label: 'Lowest CPA', value: '$67', trend: 'up', change: '23% below target' },
      { label: 'Total Conversions', value: '138', trend: 'up', change: '+12% vs last week' }
    ]
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const newMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };
    
    setChatHistory([...chatHistory, newMessage]);
    
    // Simulate AI response based on the message
    setTimeout(() => {
      let aiResponse;
      
      if (message.toLowerCase().includes('creative') || message.toLowerCase().includes('optimization')) {
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai' as const,
          content: "Based on your LinkedIn Ads data from the past 30 days, I've analyzed the performance of your 5 active creatives. Here's what the data reveals about your creative optimization opportunities:",
          timestamp: new Date(),
          hasChart: true,
          hasTable: true,
          chartData: sampleCreativeData.chartData,
          tableData: sampleCreativeData.tableData,
          insights: sampleCreativeData.insights
        };
      } else {
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai' as const,
          content: "I'm analyzing your data to provide insights. Here's what I found based on your query...",
          timestamp: new Date(),
          hasChart: true,
          hasTable: false,
          insights: [
            { label: 'Key Metric', value: '2.4%', trend: 'up', change: '+15% vs last month' },
            { label: 'Performance', value: 'Strong', trend: 'up', change: 'Above benchmark' },
            { label: 'Opportunities', value: '3', trend: 'neutral', change: 'Action items identified' }
          ]
        };
      }
      
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1500);
    
    setMessage('');
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  const loadCreativeOptimizationChat = () => {
    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: "Show me creative optimization insights for my LinkedIn campaigns",
      timestamp: new Date()
    };
    
    const aiResponse = {
      id: Date.now() + 1,
      type: 'ai' as const,
      content: "Based on your LinkedIn Ads data from the past 30 days, I've analyzed the performance of your 5 active creatives. Here's what the data reveals about your creative optimization opportunities:",
      timestamp: new Date(),
      hasChart: true,
      hasTable: true,
      chartData: sampleCreativeData.chartData,
      tableData: sampleCreativeData.tableData,
      insights: sampleCreativeData.insights
    };
    
    setChatHistory([userMessage, aiResponse]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main DemandSense Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* AI Chat Content */}
        <div className="flex-1 flex">
          {/* Chat Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">AI Chat</h2>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search chats..." 
                  className="pl-10"
                />
              </div>
            </div>

            {/* Chat History */}
            <ScrollArea className="flex-1 p-4">
              {/* Pinned Chats */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Pin className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Pinned</span>
                </div>
                <div className="space-y-2">
                  {recentChats.filter(chat => chat.pinned).map(chat => (
                    <div 
                      key={chat.id} 
                      className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100"
                      onClick={() => chat.title === "Creative optimization insights" && loadCreativeOptimizationChat()}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{chat.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                        </div>
                        <Pin className="w-3 h-3 text-blue-600 ml-2 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Chats */}
              <div>
                <div className="flex items-center mb-3">
                  <History className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Recent</span>
                </div>
                <div className="space-y-2">
                  {recentChats.filter(chat => !chat.pinned).map(chat => (
                    <div key={chat.id} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{chat.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Module Selector */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                {modules.map(module => {
                  const Icon = module.icon;
                  return (
                    <Badge
                      key={module.id}
                      variant={selectedModule === module.id ? "default" : "outline"}
                      className={`cursor-pointer px-3 py-1 ${
                        selectedModule === module.id 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedModule(module.id)}
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {module.label}
                      {module.id === 'Auto' && <span className="ml-1 text-xs">*</span>}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 flex flex-col">
              {chatHistory.length === 0 ? (
                /* Empty State */
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center max-w-2xl">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquare className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Welcome to DemandSense AI
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Ask questions about your LinkedIn Ads performance and WebID visitor analytics. 
                      Get instant insights with charts and data visualizations.
                    </p>

                    {/* Suggested Prompts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {suggestedPrompts.slice(0, 4).map((prompt, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleSuggestedPrompt(prompt)}>
                          <CardContent className="p-4">
                            <p className="text-sm text-gray-700 text-left">{prompt}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Chat Messages */
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6 max-w-5xl mx-auto">
                    {chatHistory.map(msg => (
                      <ChatMessage key={msg.id} message={msg} />
                    ))}
                  </div>
                </ScrollArea>
              )}

              {/* Input Area */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="max-w-5xl mx-auto">
                  <div className="flex items-end space-x-3">
                    <div className="flex-1">
                      <div className="relative">
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Ask about your campaigns, visitors, or performance metrics..."
                          className="pr-12 min-h-[44px] resize-none"
                          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        />
                        <Button
                          size="sm"
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Quick Prompts */}
                      {chatHistory.length === 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {suggestedPrompts.slice(0, 3).map((prompt, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              className="text-xs"
                              onClick={() => handleSuggestedPrompt(prompt)}
                            >
                              {prompt}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    AI can make mistakes. Verify important information and check your data sources.
                  </p>
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