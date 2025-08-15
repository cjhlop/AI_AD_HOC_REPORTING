"use client"

import * as React from 'react'
import { ThumbsUp, ThumbsDown, Copy, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RecurringPromptDialog } from '@/components/RecurringPromptDialog'
import KeyInsights from '@/components/chat/KeyInsights'
import AnalysisChart from '@/components/chat/AnalysisChart'
import AnalysisTable from '@/components/chat/AnalysisTable'
import LeadsTable from '@/components/chat/LeadsTable'

export interface Message {
  id: string | number
  role: 'user' | 'assistant'
  content: string
  insights?: any[]
  chartData?: any
  tableData?: any[]
  leadsData?: any[]
  closingContent?: string
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [frequency, setFrequency] = React.useState('')

  const handleFrequencySelect = (selectedFrequency: string) => {
    setFrequency(selectedFrequency)
    setIsDialogOpen(true)
  }

  if (message.role === 'user') {
    return (
      <>
        <div className="flex items-start justify-end gap-2">
          {/* Bell icon on the left of the bubble */}
          <div className="flex-shrink-0 self-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <Bell className="w-4 h-4" />
                  <span className="sr-only">Set recurring prompt</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-1">
                <div className="flex flex-col">
                  <Button
                    variant="ghost"
                    className="justify-start px-2 py-1.5 text-sm h-auto"
                    onClick={() => handleFrequencySelect('Daily')}
                  >
                    Daily
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start px-2 py-1.5 text-sm h-auto"
                    onClick={() => handleFrequencySelect('Weekly')}
                  >
                    Weekly
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start px-2 py-1.5 text-sm h-auto"
                    onClick={() => handleFrequencySelect('Monthly')}
                  >
                    Monthly
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Message bubble in the middle */}
          <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-2xl">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>

          {/* "Me" icon on the right */}
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
        </div>
        <RecurringPromptDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          frequency={frequency}
        />
      </>
    )
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-semibold text-secondary-foreground">AI</span>
      </div>
      <div className="flex-1 space-y-3 max-w-4xl">
        <div className="bg-card rounded-lg border shadow-sm p-4 space-y-4">
          <p className="text-sm text-card-foreground leading-relaxed">{message.content}</p>
          
          {message.insights && <KeyInsights insights={message.insights} />}
          {message.chartData && <AnalysisChart chartData={message.chartData} />}
          {message.tableData && <AnalysisTable tableData={message.tableData} />}
          {message.leadsData && <LeadsTable leadsData={message.leadsData} />}

          {message.closingContent && (
            <p className="text-sm text-card-foreground pt-4 border-t mt-4 leading-relaxed">
              {message.closingContent}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-secondary">
            <ThumbsUp className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-secondary">
            <ThumbsDown className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-secondary">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}