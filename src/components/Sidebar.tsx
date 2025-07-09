"use client"

import {
  Bot,
  Code2,
  Settings,
  LifeBuoy,
  SquareUser,
  Triangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const chats = [
  { id: 1, name: 'Creative optimization insights', isRecurring: true },
  { id: 2, name: 'Audience segmentation for new campaign', isRecurring: false },
  { id: 3, name: 'Weekly performance report', isRecurring: false },
  { id: 4, name: 'Analyze spend for Q3', isRecurring: false },
]

export function Sidebar() {
  return (
    <aside className="inset-y-0 left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg bg-muted"
                aria-label="Playground"
              >
                <SquareUser className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Playground
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Models"
              >
                <Bot className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Models
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="API"
              >
                <Code2 className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              API
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">Chats</h2>
          <div className="mt-4 space-y-1">
            {chats.map(chat => (
              <a
                key={chat.id}
                href="#"
                className={cn(
                  'flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md',
                  'text-gray-700 hover:bg-gray-100'
                )}
              >
                <span className="truncate">{chat.name}</span>
                {chat.isRecurring && <Badge variant="secondary">Recurring</Badge>}
              </a>
            ))}
          </div>
        </div>
      </div>
      <nav className="mt-auto grid gap-1 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
              >
                <Settings className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Account
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}