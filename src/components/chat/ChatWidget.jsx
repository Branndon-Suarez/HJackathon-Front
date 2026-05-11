import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { diagnosticService } from '../../services/api';

const SUGGESTED_ACTIONS_REGEX = /\[([^\]]+)\]/g;

function parseActions(content) {
  const actions = [];
  let match;
  while ((match = SUGGESTED_ACTIONS_REGEX.exec(content)) !== null) {
    actions.push(match[1]);
  }
  return actions;
}

function stripActions(content) {
  return content.replace(SUGGESTED_ACTIONS_REGEX, '').replace(/\n{3,}/g, '\n\n').trim();
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [polling, setPolling] = useState(false);
  const messagesEndRef = useRef(null);
  const pollRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!open) return;
    if (conversationId) return;

    const init = async () => {
      setLoading(true);
      try {
        const res = await diagnosticService.createConversation();
        const conv = res.data?.data;
        if (conv?.id) {
          setConversationId(conv.id);
          setMessages(conv.messages || []);
        }
      } catch (err) {
        console.error('Chat init error:', err);
      } finally {
        setLoading(false);
      }
    };
    init();

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [open, conversationId]);

  const pollMessages = useCallback((convId) => {
    if (pollRef.current) clearInterval(pollRef.current);
    setPolling(true);

    pollRef.current = setInterval(async () => {
      try {
        const res = await diagnosticService.getMessages(convId);
        const msgs = res.data?.data || [];
        setMessages(msgs);

        const last = msgs[msgs.length - 1];
        if (last?.role === 'bot') {
          clearInterval(pollRef.current);
          pollRef.current = null;
          setPolling(false);
        }
      } catch {
        clearInterval(pollRef.current);
        pollRef.current = null;
        setPolling(false);
      }
    }, 2000);

    setTimeout(() => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
        setPolling(false);
      }
    }, 30000);
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim() || !conversationId) return;

    const userText = text.trim();
    setInput('');
    setSending(true);

    setMessages(prev => [...prev, { id: 'temp', role: 'user', content: userText, created_at: new Date().toISOString() }]);

    try {
      await diagnosticService.sendMessage(conversationId, userText);
      pollMessages(conversationId);
    } catch (err) {
      console.error('Send message error:', err);
      setSending(false);
    }
  };

  const handleActionClick = (actionText) => {
    sendMessage(actionText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const renderMessage = (msg) => {
    const isBot = msg.role === 'bot';
    const content = msg.content || '';
    const actions = isBot ? parseActions(content) : [];
    const cleanContent = isBot ? stripActions(content) : content;

    return (
      <div key={msg.id || msg.temp} className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isBot ? 'bg-[#E625FF]/20' : 'bg-[#0FEFFD]/20'}`}>
          {isBot ? <Bot size={14} className="text-[#E625FF]" /> : <User size={14} className="text-[#0FEFFD]" />}
        </div>
        <div className={`max-w-[85%] space-y-2 ${isBot ? '' : 'items-end flex flex-col'}`}>
          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isBot ? 'bg-[#1A1C26] text-gray-200 rounded-tl-sm' : 'bg-gradient-to-r from-[#E625FF] to-[#5B16E6] text-white rounded-tr-sm'
          }`}>
            {cleanContent.split('\n').map((line, i) => (
              <p key={i} className={line.trim() === '' ? 'h-2' : ''}>{line}</p>
            ))}
          </div>
          {isBot && actions.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {actions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleActionClick(action)}
                  className="px-3 py-1.5 text-[10px] font-bold text-[#0FEFFD] bg-[#0FEFFD]/10 border border-[#0FEFFD]/20 rounded-full hover:bg-[#0FEFFD]/20 hover:border-[#0FEFFD]/40 transition-all"
                >
                  {action}
                </button>
              ))}
            </div>
          )}
          <span className={`text-[9px] text-gray-600 px-1 ${isBot ? '' : 'text-right'}`}>
            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#E625FF] to-[#5B16E6] flex items-center justify-center shadow-[0_0_30px_rgba(230,37,255,0.4)] hover:scale-110 active:scale-95 transition-all z-50"
      >
        <MessageCircle size={24} className="text-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[380px] h-[560px] bg-[#12131A] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-8 duration-300">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#0B0B10] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B16E6] to-[#E625FF] flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Asistente RiBuzz</h3>
            <p className="text-[9px] text-gray-500 font-medium">
              {polling ? 'Escribiendo...' : loading ? 'Conectando...' : 'Online'}
            </p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={24} className="animate-spin text-[#E625FF]" />
              <p className="text-[10px] text-gray-500 font-medium">Iniciando conversación...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div className="space-y-2">
              <Bot size={32} className="text-gray-600 mx-auto" />
              <p className="text-xs text-gray-500">No hay mensajes aún. ¡Empieza a escribir!</p>
            </div>
          </div>
        ) : (
          messages.map(renderMessage)
        )}
        {polling && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E625FF]/20 flex items-center justify-center">
              <Bot size={14} className="text-[#E625FF]" />
            </div>
            <div className="bg-[#1A1C26] px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-[#0B0B10] shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            disabled={sending || loading}
            className="flex-1 bg-[#1A1C26] border border-white/5 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#E625FF]/50 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || sending || loading}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-[#E625FF] to-[#5B16E6] flex items-center justify-center disabled:opacity-50 hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            {sending ? <Loader2 size={16} className="animate-spin text-white" /> : <Send size={16} className="text-white" />}
          </button>
        </div>
      </form>
    </div>
  );
}
