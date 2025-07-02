import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Paperclip, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AIChat = () => {
  const messages = [
    {
      sender: 'ai',
      text: "Hello! I'm a marketing AI assistant. How can I help you with your campaigns today?",
    },
    {
      sender: 'user',
      text: 'I need to create a new campaign for our summer sale. Can you give me some ideas for ad copy?',
    },
    {
      sender: 'ai',
      text: "Of course! For a summer sale, we could focus on themes like 'Sunny Savings' or 'Heat up your sales'. Here are a few options:\n\n1. 'Soak up the savings! Get 25% off all summer essentials.'\n2. 'Don’t let these deals melt away! Shop our Summer Sale for hot discounts.'\n3. 'Your summer just got better. Explore exclusive offers and new arrivals.'\n\nWhich one resonates most with your brand?",
    },
    {
      sender: 'user',
      text: "I like option 2. It's catchy. Let's go with that one."
    },
    {
      sender: 'ai',
      text: "Excellent choice! I'll start drafting the campaign assets with the 'Don’t let these deals melt away!' tagline. I'll focus on vibrant, sunny visuals to match. I'll let you know when the first drafts are ready for review."
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Main Content - Added padding-bottom to avoid overlap with fixed input */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="py-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Chat Messages */}
            <div className="space-y-8">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'ai' && (
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`max-w-lg p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  {msg.sender === 'user' && (
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Input Area - Now fixed to the bottom */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <Textarea 
                placeholder="Type your message here..." 
                className="min-h-[48px] resize-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;