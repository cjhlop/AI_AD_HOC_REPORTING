"use client"

import * as React from 'react'
import { ThumbsUp, ThumbsDown, Copy, Bell } from 'lucide-react'
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

export interface Message {
  id: string | number
  role: 'user' | 'assistant'
  content: string
  icon?: React.ElementType
  insights?: any[]
  chartData?: any
  tableData?: any[]
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
        <div className="flex items-center justify-end gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 text-gray-500 hover:text-gray-900"
              >
                <Bell className="w-5 h-5" />
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
          <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-md">
            <p className="text-sm">{message.content}</p>
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
    <div className="flex items-start gap-2.5">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-semibold text-gray-600">AI</span>
      </div>
      <div className="flex-1 space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 shadow-sm">
          <p className="text-sm text-gray-800">{message.content}</p>
        </div>
        
        {message.insights && <KeyInsights insights={message.insights} />}
        {message.chartData && <AnalysisChart chartData={message.chartData} />}
        {message.tableData && <AnalysisTable tableData={message.tableData} />}

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100">
            <ThumbsUp className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100">
            <ThumbsDown className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}