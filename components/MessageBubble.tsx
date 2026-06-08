import { UIMessage } from 'ai';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  if (message.role === 'system') return null;

  return (
    <div className={cn(
      "flex w-full gap-4 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm mt-1">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm",
        isUser 
          ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-tr-sm" 
          : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-800 rounded-tl-sm"
      )}>
        <p className="whitespace-pre-wrap break-words">
          {message.parts
            .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
            .map((part, i) => <span key={i}>{part.text}</span>)}
        </p>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-sm mt-1 border border-zinc-300/50 dark:border-zinc-700/50">
          <User className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
        </div>
      )}
    </div>
  );
}
