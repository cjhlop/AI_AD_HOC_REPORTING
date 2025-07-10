import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { commands } from './commands';
import { Chip } from './Chip';
import { Paperclip } from 'lucide-react';

export interface ChatInputHandle {
  reset: () => void;
  focus: () => void;
}

interface ChatInputProps {
  onSendMessage: (message: string, data?: any) => void;
  isLoading: boolean;
}

const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(({ onSendMessage, isLoading }, ref) => {
  const [value, setValue] = useState<Array<{ type: 'text'; content: string } | { type: 'chip'; content: string; data: any }>>([{ type: 'text', content: '' }]);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setValue([{ type: 'text', content: '' }]);
    },
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    const newCommandQueryMatch = /(?:^|\s)\/(\w*)$/.exec(inputValue);

    if (newCommandQueryMatch) {
      const query = newCommandQueryMatch[1];
      setCommandQuery(query);
      setCommandMenuOpen(true);
    } else {
      setCommandMenuOpen(false);
    }

    const lastSegment = value[value.length - 1];
    if (lastSegment.type === 'text') {
      const newValue = [...value];
      newValue[newValue.length - 1] = { type: 'text', content: inputValue };
      setValue(newValue);
    } else {
      setValue([...value, { type: 'text', content: inputValue }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !commandMenuOpen) {
      e.preventDefault();
      const message = value.map(v => v.content).join('');
      const data = value.filter(v => v.type === 'chip').map(v => v.data);
      if (message.trim() || data.length > 0) {
        onSendMessage(message, data.length > 0 ? data : undefined);
        setValue([{ type: 'text', content: '' }]);
      }
    } else if (e.key === 'Backspace' && (e.target as HTMLInputElement).value === '') {
      if (value.length > 1 && value[value.length - 2].type === 'chip') {
        e.preventDefault();
        const newValue = value.slice(0, -2);
        setValue(newValue.length > 0 ? newValue : [{ type: 'text', content: '' }]);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  const handleSelectCommand = (command: any, item: any) => {
    const textBeforeCommand = (value.find(v => v.type === 'text')?.content || '').replace(/\/\w*$/, '');
    
    const newSegments = [
      ...value.slice(0, -1),
      { type: 'text' as const, content: textBeforeCommand.trimEnd() + ' ' },
      { type: 'chip' as const, content: item.label, data: item },
      { type: 'text' as const, content: ' ' }
    ];

    setValue(newSegments);
    setCommandMenuOpen(false);
    setCommandQuery('');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const renderValue = () => {
    return value.map((item, index) => {
      if (item.type === 'chip') {
        return <Chip key={index} label={item.content} onRemove={() => {
          const newValue = [...value.slice(0, index), ...value.slice(index + 1)];
          // merge text segments if they are adjacent after removing a chip
          for (let i = 0; i < newValue.length - 1; i++) {
            if (newValue[i].type === 'text' && newValue[i+1].type === 'text') {
              newValue[i].content += newValue[i+1].content;
              newValue.splice(i+1, 1);
              i--;
            }
          }
          setValue(newValue.length > 0 ? newValue : [{ type: 'text', content: '' }]);
        }} />;
      }
      return null; // text is handled by the input
    });
  };

  const currentTextValue = value.length > 0 && value[value.length - 1].type === 'text' ? value[value.length - 1].content : '';

  return (
    <div className="relative w-full">
      {commandMenuOpen && (
        <Command className="absolute bottom-full mb-2 w-full rounded-lg border shadow-md bg-white">
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Commands">
              {commands
                .filter(c => c.name.toLowerCase().includes(commandQuery.toLowerCase()))
                .map(command => (
                  <CommandItem key={command.name} onSelect={() => handleSelectCommand(command, { type: command.name, label: command.name })}>
                    {command.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
      <div
        ref={containerRef}
        className="flex flex-wrap items-center w-full min-h-[60px] max-h-[200px] px-3 py-1.5 border border-gray-300 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-white text-gray-900 overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {renderValue()}
        <input
          ref={inputRef}
          type="text"
          value={currentTextValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[50px] bg-transparent outline-none placeholder-gray-500"
          placeholder="Type a message or / for commands..."
          disabled={isLoading}
        />
        <button
          type="button"
          className="p-1 text-gray-500 hover:text-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <Paperclip className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
});

export default ChatInput;