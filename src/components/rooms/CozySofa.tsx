import React, { useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../../types';

interface CozySofaProps {
  onBack: () => void;
}

const MOOD_CHIPS = [
  '平常',
  '加班到好累',
  '莫名有点低落',
  '在纠结一件事',
  '深夜失眠中',
  '只是想发会儿呆',
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-0',
    sender: 'cat',
    text: '*慢吞吞慢悠悠地伸了个绵长的懒腰，蓬松的橘白尾巴轻轻扫过沙发垫*\n\n喵呜……你来啦。随便坐，旁边的羊绒毯子刚晒过太阳，暖烘烘的。今天肩膀是不是又绷得很紧？先卸下力气待会儿吧。',
    timestamp: '刚刚',
  },
];

export const CozySofa: React.FC<CozySofaProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [currentMood, setCurrentMood] = useState(MOOD_CHIPS[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userText = inputText.trim();
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          currentMood,
          history: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();
      const catMsg: ChatMessage = {
        id: `cat-${Date.now()}`,
        sender: 'cat',
        text: data.reply || '*慢吞吞发出温柔的呼噜声* 喵呜，我一直在听哦。',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, catMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `cat-${Date.now()}`,
        sender: 'cat',
        text: '*慢吞吞用带着阳光味道的脑门轻轻顶了顶你的手臂*\n\n喵……网络思绪稍微飘走了一秒钟，不过小猫咪一直坐在沙发垫上陪着你。你刚刚说的我都放在心里啦。',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-6 md:p-10 select-none animate-fade-in">
      {/* 顶部标语 */}
      <div className="text-center mb-8 pb-6 border-b border-[#4A4541]/10">
        <h2 className="font-serif italic text-3xl text-[#4A4541]">陪伴沙发</h2>
        <p className="text-xs text-[#4A4541]/60 mt-2 font-light max-w-md mx-auto leading-relaxed">
          这里没有冰冷的 AI 客服。小猫“慢吞吞”不会教你做人，也不会催你努力。当你累了、纠结了，先被允许待在当下。
        </p>
      </div>

      {/* 小猫咪互动形象栏 */}
      <div className="paper-card tape-top tape-top-sky p-6 rounded-xs mb-6 bg-[#FAF7F2] border-2 border-[#D4A373]/30 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="w-20 h-20 bg-[#D4A373] rounded-full shrink-0 relative shadow-md flex items-center justify-center text-white font-serif italic text-lg">
          <span>Purr~</span>
          {/* 猫咪耳朵 */}
          <div className="absolute -top-2 left-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#D4A373] -rotate-12" />
          <div className="absolute -top-2 right-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#D4A373] rotate-12" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="font-serif italic text-xl font-medium text-[#4A4541]">慢吞吞 (Slowly)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-[#9BAE96]/20 text-[#9BAE96] rounded-full">
              情绪承接小助手
            </span>
          </div>
          <p className="text-xs text-[#4A4541]/70 font-light leading-relaxed">
            “喵呜……我是一只慢吞吞的小猫。你可以随时跟我抱怨今天遇到的奇葩事，或者聊聊晚饭想吃什么。”
          </p>

          {/* 状态快捷选择标签 */}
          <div className="pt-1 flex flex-wrap gap-1.5 items-center justify-center sm:justify-start">
            <span className="text-[11px] font-mono text-[#4A4541]/45">此刻状态：</span>
            {MOOD_CHIPS.map((chip) => (
              <button
                type="button"
                key={chip}
                onClick={() => setCurrentMood(chip)}
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono transition-colors ${
                  currentMood === chip
                    ? 'bg-[#D4A373] text-white'
                    : 'bg-white/80 text-[#4A4541]/70 hover:bg-white border border-[#4A4541]/8'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 沙发对谈框（记录流） */}
      <div className="paper-card p-6 rounded-xs bg-[#FFFDF9] flex flex-col h-[480px]">
        <div className="flex-1 overflow-y-auto space-y-5 pr-2 mb-4">
          {messages.map((msg) => {
            const isCat = msg.sender === 'cat';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isCat ? 'items-start' : 'items-end'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-[10px] font-mono text-[#4A4541]/40">
                    {isCat ? '🐱 慢吞吞' : '👤 你'} · {msg.timestamp}
                  </span>
                </div>
                <div
                  className={`max-w-[85%] p-4 rounded-xs text-xs md:text-sm leading-relaxed font-light whitespace-pre-wrap ${
                    isCat
                      ? 'bg-[#FAF7F2] text-[#4A4541] border border-[#D4A373]/20 shadow-2xs rounded-tl-none -rotate-0.5'
                      : 'bg-[#4A4541] text-[#FDFBF7] shadow-xs rounded-tr-none rotate-0.5'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4A373] bg-[#FAF7F2]/50 p-3 rounded-xs w-fit animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>慢吞吞正在甩甩尾巴思考怎么安慰你……</span>
            </div>
          )}
        </div>

        {/* 底部轻语输入栏 */}
        <form onSubmit={handleSend} className="pt-3 border-t border-[#4A4541]/8 flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="对慢吞吞说点什么……（吐槽、叹气、发呆语都行）"
            disabled={isLoading}
            className="flex-1 p-3 text-xs md:text-sm bg-[#FAF7F2]/60 border border-[#4A4541]/15 rounded-xs text-[#4A4541] placeholder-[#4A4541]/35 focus:outline-hidden focus:border-[#D4A373] transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-5 py-3 bg-[#D4A373] hover:bg-[#D4A373]/90 disabled:opacity-30 text-white rounded-xs font-serif text-xs tracking-wider transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <span>轻声说</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
