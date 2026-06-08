'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { PatientInfo } from '@/types/patient';
import MessageBubble from './MessageBubble';
import { Send, Loader2, ShieldAlert } from 'lucide-react';
import { useEffect, useRef, useState, useMemo } from 'react';

export default function ChatWindow({ patientInfo }: { patientInfo?: PatientInfo }) {
  const transport = useMemo(() => new DefaultChatTransport({
    api: '/api/chat',
    body: () => ({ patientInfo }),
  }), [patientInfo]);

  const { messages, status, sendMessage } = useChat({
    transport,
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ type: 'text', text: "Hello! I'm the digital assistant. I can help clarify your symptoms for the doctor or answer non-medical questions about your visit today. How can I help you?" }],
      }
    ]
  });

  const [input, setInput] = useState('');
  const isLoading = status === 'submitted' || status === 'streaming';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            AI Assistant
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Powered by Generative AI</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-medium">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>No Medical Advice</span>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 scroll-smooth bg-zinc-50 dark:bg-black/20"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {isLoading && (
          <div className="flex w-full gap-4 mb-6 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm mt-1">
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            </div>
            <div className="px-5 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-tl-sm flex items-center gap-1.5 shadow-sm">
              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-center"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder={!patientInfo ? "Please complete check-in first..." : "Type your message..."}
            disabled={!patientInfo || isLoading}
            className="w-full pl-5 pr-12 py-3.5 bg-zinc-100 dark:bg-zinc-800 border-transparent focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-[15px] transition-all disabled:opacity-50 disabled:cursor-not-allowed outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || !patientInfo}
            className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white disabled:text-zinc-500 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
