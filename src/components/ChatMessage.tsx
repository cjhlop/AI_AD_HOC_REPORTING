"use client"

import * as React from 'react'
import { ThumbsUp, ThumbsDown, Copy, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RecurringPromptDialog } from './RecurringPromptDialog'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  icon?: React.ElementType
  data?: {
    columns: { key: string; name: string }[]
    rows: { [key: string]: any }[]
  }
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
          <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-md flex items-center gap-2">
            <p className="text-sm flex-grow">{message.content}</p>
            {message.icon && (
              <message.icon className="w-4 h-4 text-white flex-shrink-0" />
            )}
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
      <div className="flex-1 space-y-3">
        <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-full">
          <p className="text-sm text-gray-800">{message.content}</p>
        </div>
        {message.data && (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {message.data.columns.map(col => (
                    <TableHead key={col.key}>{col.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {message.data.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {message.data?.columns.map(col => (
                      <TableCell key={col.key}>{row[col.key]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <ThumbsUp className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <ThumbsDown className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}