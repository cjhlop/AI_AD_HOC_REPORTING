import * as React from 'react';
import { Chip } from './Chip';
import { Button } from '@/components/ui/button';
import { Send, Paperclip } from 'lucide-react';

export interface ContentPart {
  id: string;
  type: 'text' | 'chip';
  value: string;
  color?: 'blue' | 'multicolor' | 'indigo' | 'orange' | 'gray';
}

interface ChatInputProps {
  content: ContentPart[];
  setContent: (content: ContentPart[]) => void;
  placeholder: string;
  onSendMessage: () => void;
  isLoading: boolean;
}

export const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ content, setContent, placeholder, onSendMessage, isLoading }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const textInput = content.find(p => p.type === 'text');

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      const otherParts = content.filter(p => p.type === 'chip');
      if (newText || otherParts.length > 0) {
        setContent([...otherParts, { id: 'text', type: 'text', value: newText }]);
      } else {
        setContent([]);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!isLoading) {
          onSendMessage();
        }
      } else if (e.key === 'Backspace' && (e.target as HTMLTextAreaElement).value === '' && content.some(p => p.type === 'chip')) {
        e.preventDefault();
        const chipParts = content.filter(p => p.type === 'chip');
        const textPart = content.find(p => p.type === 'text');
        const newContent = chipParts.slice(0, -1);
        if (textPart) {
          newContent.push(textPart);
        }
        setContent(newContent);
      }
    };
    
    React.useEffect(() => {
        const textarea = (ref as React.RefObject<HTMLTextAreaElement>)?.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [textInput?.value, ref]);

    return (
      <div
        ref={containerRef}
        className="flex items-start w-full p-2 border border-gray-300 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-white text-gray-900"
        onClick={() => (ref as React.RefObject<HTMLTextAreaElement>).current?.focus()}
      >
        <Button size="icon" variant="ghost" className="h-9 w-9 flex-shrink-0 text-gray-500 hover:text-gray-700">
            <Paperclip className="w-5 h-5" />
        </Button>
        <div className="flex-grow flex flex-wrap items-center px-2">
            {content.map(part =>
              part.type === 'chip' ? (
                <Chip
                  key={part.id}
                  label={part.value}
                  color={part.color}
                  onRemove={() => {
                    const newContent = content.filter(p => p.id !== part.id);
                    setContent(newContent);
                  }}
                />
              ) : null
            )}
            <textarea
              ref={ref}
              value={textInput?.value || ''}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              placeholder={content.length === 0 ? placeholder : ''}
              className="flex-grow bg-transparent outline-none p-1 min-w-[100px] resize-none overflow-y-hidden"
              rows={1}
              disabled={isLoading}
            />
        </div>
        <Button size="icon" onClick={onSendMessage} disabled={content.length === 0 || isLoading} className="h-9 w-9 flex-shrink-0">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    );
  }
);