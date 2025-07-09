"use client"

import * as React from 'react'
import {
  Paperclip,
  Mic,
  CornerDownLeft,
  ThumbsUp,
  ThumbsDown,
  Copy,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ChatMessage, type Message } from '@/components/ChatMessage'
import { SlashCommandMenu } from '@/components/SlashCommandMenu'
import { cn } from '@/lib/utils'

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content:
      "Hello! I'm here to help you with your marketing data. What insights are you looking for today?",
    id: '1',
  },
  {
    role: 'user',
    content:
      'Show me a summary of my campaign performance for the last 7 days, grouped by campaign name.',
    id: '2',
    icon: CornerDownLeft,
  },
  {
    role: 'assistant',
    content:
      'Of course. Here is a summary of your campaign performance for the last 7 days:',
    id: '3',
    data: {
      columns: [
        { key: 'campaign', name: 'Campaign' },
        { key: 'spend', name: 'Spend' },
        { key: 'clicks', name: 'Clicks' },
        { key: 'cpc', name: 'CPC' },
      ],
      rows: [
        {
          campaign: 'Q3 Lead Gen',
          spend: '$5,430',
          clicks: '12,876',
          cpc: '$0.42',
        },
        {
          campaign: 'Summer Sale',
          spend: '$2,120',
          clicks: '8,450',
          cpc: '$0.25',
        },
        {
          campaign: 'Brand Awareness',
          spend: '$8,760',
          clicks: '25,980',
          cpc: '$0.34',
        },
      ],
    },
  },
]

const datasets = [
  {
    id: 'auto',
    name: 'Auto',
    description: 'Automatic selection of data sources',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Ads',
    description: 'Metrics and dimensions from LinkedIn Ads',
  },
  {
    id: 'website_visitor',
    name: 'Website Visitor',
    description: 'Website visitor identification data',
  },
  {
    id: 'google_ads',
    name: 'Google Ads',
    description: 'Metrics and dimensions from Google Ads',
  },
  {
    id: 'meta_ads',
    name: 'Meta Ads',
    description: 'Metrics and dimensions from Meta Ads',
  },
]

export function ChatView() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [input, setInput] = React.useState('')
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    if (value.startsWith('/')) {
      setIsMenuOpen(true)
    } else {
      setIsMenuOpen(false)
    }
  }

  const handleCommandSelect = (command: string) => {
    setInput(prev => prev.replace(/\/\w*$/, `/${command} `))
    setIsMenuOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-xl font-bold">Creative optimization insights</h1>
          <div className="flex items-center gap-2 mt-1">
            {datasets.map(d => (
              <span
                key={d.id}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      <div className="p-4 border-t bg-white">
        <div className="relative">
          <Textarea
            ref={inputRef}
            placeholder="Ask a question or type '/' for commands..."
            className="w-full pr-28 min-h-[48px] resize-none"
            value={input}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                // Handle message sending
              }
            }}
          />
          {isMenuOpen && (
            <SlashCommandMenu
              datasets={datasets}
              onSelect={handleCommandSelect}
            />
          )}
          <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Paperclip className="w-5 h-5" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Attach file</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Mic className="w-5 h-5" />
                    <span className="sr-only">Use microphone</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Use microphone</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button size="sm">
              Send <CornerDownLeft className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}