"use client"

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

interface RecurringPromptDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  frequency: string
}

// Mock data - assuming Slack is not connected initially
const isSlackConnected = false
const slackChannels = [
  { id: 'C12345', name: '#general' },
  { id: 'C67890', name: '#marketing' },
  { id: 'CABCDE', name: '#random' },
]

export function RecurringPromptDialog({
  isOpen,
  onOpenChange,
  frequency,
}: RecurringPromptDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set up {frequency} Recurring Prompt</DialogTitle>
          <DialogDescription>
            Push this prompt to a Slack channel on a recurring basis.
          </DialogDescription>
        </DialogHeader>
        {isSlackConnected ? (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="channel" className="text-right">
                Channel
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a channel" />
                </SelectTrigger>
                <SelectContent>
                  {slackChannels.map(channel => (
                    <SelectItem key={channel.id} value={channel.id}>
                      {channel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Custom Message
              </Label>
              <Input
                id="message"
                placeholder="Optional custom message"
                className="col-span-3"
              />
            </div>
          </div>
        ) : (
          <div className="py-4">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Slack not connected!</AlertTitle>
              <AlertDescription>
                You need to connect your Slack account to set up recurring
                prompts.
              </AlertDescription>
            </Alert>
          </div>
        )}
        <DialogFooter>
          {isSlackConnected ? (
            <Button type="submit">Save Changes</Button>
          ) : (
            <Button>Setup Connection</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}