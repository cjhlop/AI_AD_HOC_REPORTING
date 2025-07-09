import React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../components/ui/resizable'
import { Sidebar } from '../components/Sidebar'
import { ChatView } from '../components/ChatView'

export default function AIChatPage() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <ChatView />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}