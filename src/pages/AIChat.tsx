import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatInput, { ChatInputHandle } from '@/components/chat/ChatInput';

type ContentPart = {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
};

const AIChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ContentPart[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<ChatInputHandle>(null);

  const onSendMessage = async (message: string, data?: any) => {
    if (!message.trim() && !data) return;
    setIsLoading(true);
    inputRef.current?.reset();

    const newUserMessage: ContentPart = { role: 'user', parts: [{ text: message }] };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    // Simulate API call
    setTimeout(() => {
      const modelResponse: ContentPart = {
        role: 'model',
        parts: [{ text: `This is a simulated response to: "${message}"` }],
      };
      setMessages(prev => [...prev, modelResponse]);
      setIsLoading(false);
      inputRef.current?.focus();
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
      </header>
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'model' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg p-3 max-w-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                  {msg.parts.map((part, i) => (
                    <div key={i} className="whitespace-pre-wrap">
                      {part.text}
                    </div>
                  ))}
                </div>
                {msg.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-gray-200 text-gray-900">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
      <footer className="p-4 bg-white border-t">
        <div className="max-w-3xl mx-auto">
          <ChatInput ref={inputRef} onSendMessage={onSendMessage} isLoading={isLoading} />
          <p className="text-xs text-center text-gray-500 mt-2">
            You can use / to bring up a list of commands.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AIChatPage;