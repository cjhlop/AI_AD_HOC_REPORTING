import React, { useRef, useEffect, forwardRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Paperclip } from 'lucide-react';

export interface ContentPart {
  id: string;
  type: 'chip' | 'text';
  value: string;
  color?: string;
}

interface ChatInputProps {
  content: ContentPart[];
  setContent: (content: ContentPart[]) => void;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  ({ content, setContent, placeholder, onKeyDown }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const textPart = content.find(p => p.type === 'text') || { id: 'text', type: 'text', value: '' };
    const chips = content.filter(p => p.type === 'chip');

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newText = e.target.value;
      const otherParts = content.filter(p => p.type !== 'text');
      setContent([...otherParts, { ...textPart, value: newText }]);
    };

    const removeChip = (id: string) => {
      setContent(content.filter(p => p.id !== id));
    };

    useEffect(() => {
      if (ref && (ref as React.RefObject<HTMLInputElement>).current) {
        const input = (ref as React.RefObject<HTMLInputElement>).current;
        // Move cursor to the end
        input.selectionStart = input.selectionEnd = input.value.length;
      }
    }, [content, ref]);

    return (
      <div
        ref={containerRef}
        className="flex items-start w-full min-h-[60px] max-h-[200px] p-2 border border-gray-300 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-white text-gray-900"
        onClick={() => (ref as React.RefObject<HTMLInputElement>).current?.focus()}
      >
        <Button variant="ghost" size="icon" className="mr-2 flex-shrink-0 h-8 w-8">
          <Paperclip className="h-4 w-4 text-gray-500" />
        </Button>
        <div className="flex-1 flex flex-wrap items-center overflow-y-auto max-h-[180px]">
          {chips.map(part => (
            <Badge
              key={part.id}
              variant="secondary"
              className={`mr-2 my-1 flex items-center ${part.color || 'bg-gray-200'}`}
            >
              {part.value}
              <button onClick={(e) => { e.stopPropagation(); removeChip(part.id); }} className="ml-1.5 rounded-full hover:bg-gray-400/50 p-0.5">
                <X size={12} />
              </button>
            </Badge>
          ))}
          <input
            ref={ref}
            type="text"
            value={textPart.value}
            onChange={handleTextChange}
            onKeyDown={onKeyDown}
            placeholder={chips.length === 0 ? placeholder : ''}
            className="flex-1 bg-transparent outline-none min-w-[100px] h-full self-stretch py-1"
          />
        </div>
      </div>
    );
  }
);

ChatInput.displayName = 'ChatInput';