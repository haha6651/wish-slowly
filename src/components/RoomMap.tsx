import React from 'react';
import { ROOMS } from '../data/initialData';
import { RoomId } from '../types';

interface RoomMapProps {
  onSelectRoom: (id: RoomId) => void;
}

export const RoomMap: React.FC<RoomMapProps> = ({ onSelectRoom }) => {
  return (
    <main className="relative flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
      {/* 引导语介绍 */}
      <div className="text-center mb-8 sm:mb-12 max-w-xl mx-auto">
        <p className="text-[#4A4541]/80 text-sm md:text-base font-serif italic leading-relaxed">
          “你不是一台需要被优化的操作系统，而是一个会累的人。”
        </p>
        <p className="text-xs text-[#4A4541]/50 mt-1.5">
          请推开适合你此刻情绪状态的那扇门，走进房间里待一会儿。
        </p>
      </div>

      {/* 纸片质感网格房间地图 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-12">
        {ROOMS.map((room) => {
          return (
            <div
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={`paper-card tape-top p-6 rounded-xs cursor-pointer flex flex-col justify-between min-h-[220px] select-none ${room.rotationClass} ${room.accentBg}`}
            >
              {/* 顶部标签 */}
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h2 className="font-serif italic text-2xl font-medium text-[#4A4541]">
                    {room.title}
                  </h2>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-black/5 text-[#4A4541]/70 rounded-full">
                    {room.badge}
                  </span>
                </div>
                <p className="text-xs text-[#4A4541]/70 leading-relaxed font-light">
                  {room.desc}
                </p>
              </div>

              {/* 房间专属绘本纸片视觉预览区 */}
              <div className="mt-5 pt-4 border-t border-[#4A4541]/8">
                {room.id === 'diary' && (
                  <div className="polaroid-frame w-20 mx-auto transform rotate-2">
                    <div className="w-full aspect-square bg-[#FAF7F2] flex items-center justify-center border border-black/5">
                      <span className="text-xl opacity-60">☀️</span>
                    </div>
                  </div>
                )}

                {room.id === 'action' && (
                  <div className="space-y-1.5 text-xs font-mono text-[#4A4541]/80">
                    <div className="flex items-center gap-2 border-b border-dashed border-[#4A4541]/15 pb-1">
                      <span className="text-[#D4A373]">●</span>
                      <span>看窗外一分钟</span>
                    </div>
                    <div className="flex items-center gap-2 border-b border-dashed border-[#4A4541]/15 pb-1 opacity-60">
                      <span className="text-[#9BAE96]">○</span>
                      <span>喝一口润喉温水</span>
                    </div>
                  </div>
                )}

                {room.id === 'sofa' && (
                  <div className="text-center py-1">
                    <div className="w-14 h-14 bg-[#D4A373] rounded-full mx-auto relative shadow-inner flex items-center justify-center text-white font-serif italic text-sm">
                      <span className="animate-pulse">Zzz</span>
                      {/* 猫咪小耳朵 */}
                      <div className="absolute -top-1.5 left-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#D4A373] -rotate-12" />
                      <div className="absolute -top-1.5 right-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#D4A373] rotate-12" />
                    </div>
                    <p className="text-[10px] text-[#D4A373] tracking-widest uppercase mt-2">
                      慢吞吞打瞌睡中
                    </p>
                  </div>
                )}

                {room.id === 'wish' && (
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#4A4541]/80 mb-1.5">
                      <span>去海边看一次日落</span>
                      <span className="text-[#9BAE96] font-bold">65%</span>
                    </div>
                    <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#9BAE96] rounded-full w-[65%]" />
                    </div>
                  </div>
                )}

                {room.id === 'echo' && (
                  <div className="space-y-1.5 text-[11px]">
                    <div className="bg-[#B8C5D6]/30 text-[#4A4541] px-2.5 py-1 rounded-xs truncate w-11/12">
                      “今天楼下的桂花开了，好香。”
                    </div>
                    <div className="bg-[#E5B7B7]/30 text-[#4A4541] px-2.5 py-1 rounded-xs truncate ml-auto w-10/12">
                      “今晚允许自己早点睡。”
                    </div>
                  </div>
                )}

                {room.id === 'card' && (
                  <div className="flex items-center justify-center gap-2 py-1">
                    <div className="w-10 h-14 bg-[#FAF7F2] border border-[#9BAE96]/30 shadow-xs rounded-xs -rotate-6 flex items-center justify-center text-[#9BAE96] text-xs font-serif">
                      ✦
                    </div>
                    <div className="w-10 h-14 bg-[#FFFDF9] border border-[#D4A373]/30 shadow-xs rounded-xs rotate-3 flex items-center justify-center text-[#D4A373] text-xs font-serif">
                      ✧
                    </div>
                  </div>
                )}
              </div>

              {/* 底部进入指引 */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#4A4541]/40 font-mono">
                <span>点击走进房间</span>
                <span>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
