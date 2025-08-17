import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Bookmark } from 'lucide-react';

interface ChatItem {
  id: number;
  title: string;
  time: string;
  saved?: boolean;
  isRecurring?: boolean;
}

interface ChatListSidebarProps {
  onNewChat: () => void;
  onChatSelect: (chatId: number, title: string) => void;
  savedChats: ChatItem[];
  mostUsedChats: ChatItem[];
  recentUnsavedChats: ChatItem[];
}

const ChatListSidebar = ({
  onNewChat,
  onChatSelect,
  savedChats,
  mostUsedChats,
  recentUnsavedChats,
}: ChatListSidebarProps) => {
  const [chatListTab, setChatListTab] = React.useState('most-used');

  const listVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="w-80 bg-card border-r flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">AI Co-Pilot</h2>
          <Button size="sm" onClick={onNewChat}>
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search chats..." className="pl-10" />
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Bookmark className="w-4 h-4 text-muted-foreground mr-2" />
            <span className="text-sm font-medium text-foreground">Saved</span>
          </div>
          <div className="space-y-2">
            {savedChats.map(chat => (
              <div key={chat.id} className="p-3 rounded-lg hover:bg-secondary cursor-pointer border overflow-hidden" onClick={() => onChatSelect(chat.id, chat.title)}>
                <div className="flex items-center gap-2">
                  <p className="flex-1 text-sm font-medium text-foreground truncate min-w-0">{chat.title}</p>
                  {chat.isRecurring && <Badge variant="secondary" className="flex-shrink-0">Recurring</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{chat.time}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <ToggleGroup 
            type="single" 
            defaultValue="most-used" 
            className="grid w-full grid-cols-2 mb-3"
            value={chatListTab}
            onValueChange={(value) => value && setChatListTab(value)}
          >
            <ToggleGroupItem value="most-used">Most Used</ToggleGroupItem>
            <ToggleGroupItem value="recent">Recent</ToggleGroupItem>
          </ToggleGroup>
          <div className="relative h-40">
            <AnimatePresence mode="wait">
              <motion.div
                key={chatListTab}
                variants={listVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="absolute w-full space-y-2"
              >
                {(chatListTab === 'most-used' ? mostUsedChats : recentUnsavedChats).map(chat => (
                  <div key={chat.id} className="p-3 rounded-lg hover:bg-secondary cursor-pointer overflow-hidden" onClick={() => onChatSelect(chat.id, chat.title)}>
                    <p className="text-sm font-medium text-foreground truncate">{chat.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{chat.time}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatListSidebar;