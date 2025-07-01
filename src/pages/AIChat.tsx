import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Pin, 
  Download, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  Send,
  Sparkles,
  BarChart3,
  Users,
  Globe,
  ChevronDown,
  History,
  Star
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

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setMessage('');
    
    // Simulate AI response (in real app, this would call the API)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm analyzing your data to provide insights...",
        timestamp: new Date(),
        hasChart: true,
        hasTable: true
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
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
                <div key={chat.id} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100">
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
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
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
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
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
              <div className="space-y-6 max-w-4xl mx-auto">
                {chatHistory.map(msg => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.type === 'user' ? (
                      <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-md">
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl w-full">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 mb-4">{msg.content}</p>
                            
                            {/* Mock Chart/Table */}
                            {msg.hasChart && (
                              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-center justify-center">
                                  <BarChart3 className="w-12 h-12 text-gray-400" />
                                </div>
                              </div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                              <Button size="sm" variant="outline">
                                <Pin className="w-3 h-3 mr-1" />
                                Pin
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-3 h-3 mr-1" />
                                CSV
                              </Button>
                              <Button size="sm" variant="outline">
                                <Copy className="w-3 h-3 mr-1" />
                                SQL
                              </Button>
                              <div className="flex-1" />
                              <Button size="sm" variant="ghost">
                                <ThumbsUp className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <ThumbsDown className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="max-w-4xl mx-auto">
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
                          onClick={() => setMessage(prompt)}
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
  );
};

export default AIChat;