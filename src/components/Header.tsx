import React from 'react';
import { Sparkles, Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { RoomId } from '../types';
import { ROOMS } from '../data/initialData';

interface HeaderProps {
  currentRoomId: RoomId | null;
  onBackToMap: () => void;
  stardustCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoomId,
  onBackToMap,
  stardustCount,
  soundEnabled,
  onToggleSound,
}) => {
  const currentRoom = ROOMS.find((r) => r.id === currentRoomId);

  return (
    <header className="pt-8 px-6 md:px-12 pb-4 flex flex-col sm:flex-row justify-between sm:items-baseline gap-4 max-w-6xl mx-auto w-full select-none">
      <div className="flex items-center gap-4">
        {currentRoomId && (
          <button
            onClick={onBackToMap}
            className="p-2 -ml-2 text-[#4A4541]/70 hover:text-[#4A4541] hover:bg-black/5 rounded-full transition-all flex items-center gap-1.5 text-sm font-medium"
            title="回到房间地图"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">地图房间</span>
          </button>
        )}

        <div>
          <div className="flex items-baseline gap-3">
            <h1
              onClick={onBackToMap}
              className="font-serif font-light text-3xl md:text-4xl tracking-tight text-[#4A4541] cursor-pointer hover:opacity-80 transition-opacity"
            >
              wish slowly
            </h1>
            {currentRoom && (
              <span className="font-serif-italic text-lg text-[#D4A373] hidden sm:inline">
                / {currentRoom.title}
              </span>
            )}
          </div>
          <p className="text-xs tracking-widest uppercase text-[#4A4541]/50 mt-1 font-mono">
            {currentRoom ? currentRoom.subtitle : 'A Room for Your Emotions'}
          </p>
        </div>
      </div>

      {/* 右侧温柔状态栏 */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* 星尘收集数 */}
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF7F2] border border-[#D4A373]/30 rounded-full text-xs text-[#4A4541] shadow-xs"
          title="通过微小行动积累的温柔星尘"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4A373] animate-pulse" />
          <span className="font-mono font-medium">{stardustCount}</span>
          <span className="text-[#4A4541]/60 text-[11px]">星尘</span>
        </div>

        {/* 疗愈背景音开关 */}
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-full transition-colors ${
            soundEnabled
              ? 'bg-[#9BAE96]/20 text-[#9BAE96] border border-[#9BAE96]/30'
              : 'bg-black/5 text-[#4A4541]/40 hover:text-[#4A4541]/70'
          }`}
          title={soundEnabled ? '关闭陪伴轻音乐/猫咪呼噜声' : '开启疗愈白噪音'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
