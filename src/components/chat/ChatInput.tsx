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

    const editablePart = content.length > 0 && content[content.length - 1].type === 'text' ? content[content.length - 1] : null;
    const readOnlyParts = editablePart ? content.slice(0, -1) : content;

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      if (editablePart) {
        const newContent = [...readOnlyParts];
        if (newText) {
          newContent.push({ ...editablePart, value: newText });
        }
        setContent(newContent);
      } else {
        if (newText) {
          setContent([...content, { id: `text-${Date.now()}`, type: 'text', value: newText }]);
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!isLoading) {
          onSendMessage();
        }
      } else if (e.key === 'Backspace' && (e.target as HTMLTextAreaElement).value === '' && readOnlyParts.length > 0) {
        e.preventDefault();
        setContent(readOnlyParts.slice(0, -1));
      }
    };
    
    React.useEffect(() => {
        const textarea = (ref as React.RefObject<HTMLTextAreaElement>)?.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [editablePart?.value, ref]);

    return (
      <div
        ref={containerRef}
        className="flex items-start w-full p-2 border border-gray-300 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-white text-gray-900"
        onClick={() => (ref as React.RefObject<HTMLTextAreaElement>).current?.focus()}
      >
        <Button size="icon" variant="ghost" className="h-9 w-9 flex-shrink-0 text-gray-500 hover:text-gray-700">
            <Paperclip className="w-5 h-5" />
        </Button>
        <div className="flex-grow px-2 w-full">
          <div className="w-full min-h-[24px]">
            {readOnlyParts.map(part => (
              <div key={part.id} className="float-left mr-1 mb-1">
                {part.type === 'chip' ? (
                  <Chip
                    label={part.value}
                    color={part.color}
                    onRemove={() => {
                      const newContent = content.filter(p => p.id !== part.id);
                      setContent(newContent);
                    }}
                  />
                ) : (
                  <span className="p-1 leading-tight">{part.value}</span>
                )}
              </div>
            ))}
            <div className="overflow-hidden">
              <textarea
                ref={ref}
                value={editablePart?.value || ''}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder={content.length === 0 ? placeholder : ''}
                className="w-full bg-transparent outline-none p-1 resize-none overflow-y-hidden leading-tight"
                rows={1}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        <Button size="icon" onClick={onSendMessage} disabled={content.length === 0 || isLoading} className="h-9 w-9 flex-shrink-0">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    );
  }
);