import * as React from 'react';
import { Chip } from './Chip';
import { cn } from '@/lib/utils';

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
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const ChatInput = React.forwardRef<HTMLInputElement, ChatInputProps>(
  ({ content, setContent, placeholder, onKeyDown }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const textInput = content.find(p => p.type === 'text');

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newText = e.target.value;
      const otherParts = content.filter(p => p.type === 'chip');
      if (newText) {
        setContent([...otherParts, { id: 'text', type: 'text', value: newText }]);
      } else {
        setContent(otherParts);
      }
    };

    const handleLocalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && e.currentTarget.value === '' && content.some(p => p.type === 'chip')) {
        e.preventDefault();
        const otherParts = content.filter(p => p.type === 'chip');
        setContent(otherParts.slice(0, -1));
      }
      onKeyDown(e);
    };

    return (
      <div
        ref={containerRef}
        className="flex flex-wrap items-center w-full min-h-[60px] max-h-[200px] px-3 py-1.5 border border-gray-300 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-white text-gray-900 overflow-y-auto"
        onClick={() => (ref as React.RefObject<HTMLInputElement>).current?.focus()}
      >
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
        <input
          ref={ref}
          type="text"
          value={textInput?.value || ''}
          onChange={handleTextChange}
          onKeyDown={handleLocalKeyDown}
          placeholder={content.length === 0 ? placeholder : ''}
          className="flex-grow bg-transparent outline-none p-1 min-w-[100px]"
        />
      </div>
    );
  }
);