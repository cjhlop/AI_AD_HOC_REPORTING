import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Paperclip, Send, User, Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const messages = [
  {
    sender: 'ai',
    text: 'Hello! How can I help you with your marketing campaigns today?',
  },
  {
    sender: 'user',
    text: 'I need some ideas for a new campaign targeting young adults for a new sneaker launch.',
  },
  {
    sender: 'ai',
    text: "Of course! We could try a social media campaign on platforms like TikTok and Instagram. Collaborating with influencers who align with your brand could be very effective. We could also explore creating a contest or a giveaway to generate buzz.",
  },
  {
    sender: 'user',
    text: "That sounds great. Let's focus on the influencer collaboration. Can you draft a brief for me?",
  },
    {
    sender: 'ai',
    text: "Absolutely. Here is a draft for the influencer brief...",
  },
];

const AIChat = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Header */}
      <div className="p-4 border-b bg-white">
        <h1 className="text-xl font-semibold">AI Assistant</h1>
        <p className="text-sm text-gray-500">Your creative partner for marketing campaigns</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-5xl mx-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-4 mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
              {message.sender === 'ai' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg p-3 max-w-lg ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                <p className="text-sm">{message.text}</p>
              </div>
              {message.sender === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gray-200">
                    <User size={20} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <Textarea 
                placeholder="Ask the AI to generate content, ideas, or a plan..." 
                className="min-h-[40px] resize-none"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Button>
              <Send className="w-5 h-5 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;