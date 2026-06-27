import React, { useState } from 'react';
import { Sparkles, Plus, Gift } from 'lucide-react';
import { Wish } from '../../types';

interface WishCabinetProps {
  wishes: Wish[];
  userStardust: number;
  onAddWish: (wish: Wish) => void;
  onFeedWish: (wishId: string, amount: number) => void;
  onBack: () => void;
}

export const WishCabinet: React.FC<WishCabinetProps> = ({
  wishes,
  userStardust,
  onAddWish,
  onFeedWish,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [storyNote, setStoryNote] = useState('');
  const [targetAmount, setTargetAmount] = useState(100);
  const [feedMsgId, setFeedMsgId] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      title: title.trim(),
      storyNote: storyNote.trim() || '把愿望写在这里，慢条斯理地让它开花。',
      targetStardust: targetAmount,
      currentStardust: 0,
      illustrationType: 'tree',
      createdAt: Date.now(),
    };

    onAddWish(newWish);
    setTitle('');
    setStoryNote('');
    setShowAddModal(false);
  };

  const handlePush = (wish: Wish) => {
    if (userStardust <= 0) return;
    const feedAmount = Math.min(10, userStardust, wish.targetStardust - wish.currentStardust);
    if (feedAmount <= 0) return;

    onFeedWish(wish.id, feedAmount);
    setFeedMsgId(wish.id);
    setTimeout(() => setFeedMsgId(null), 1800);
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-6 md:p-10 select-none animate-fade-in">
      {/* 顶部标语 */}
      <div className="text-center mb-10 pb-6 border-b border-[#4A4541]/10">
        <h2 className="font-serif italic text-3xl text-[#4A4541]">愿望柜</h2>
        <p className="text-xs text-[#4A4541]/60 mt-2 font-light max-w-md mx-auto leading-relaxed">
          实现愿望，不一定要像打仗一样一下子冲刺完成。把心愿寄存在这里，用日常积累的微小星尘慢慢喂养它。慢慢实现，也是一种实现。
        </p>
      </div>

      {/* 顶栏操作区 */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-2 bg-[#FAF7F2] px-4 py-2 rounded-xs border border-[#D4A373]/30 text-xs text-[#4A4541]">
          <span>你当前拥有可倾注的星尘：</span>
          <span className="font-mono font-bold text-base text-[#D4A373]">{userStardust}</span>
          <Sparkles className="w-4 h-4 text-[#D4A373] animate-pulse" />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2 bg-[#4A4541] hover:bg-[#4A4541]/90 text-[#FDFBF7] text-xs font-serif tracking-wider rounded-xs transition-all cursor-pointer shadow-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>许下一个新愿望</span>
        </button>
      </div>

      {/* 愿望绘本陈列列 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wishes.map((wish, index) => {
          const progress = Math.min(100, Math.round((wish.currentStardust / wish.targetStardust) * 100));
          const isCompleted = progress >= 100;
          const isJustFed = feedMsgId === wish.id;

          return (
            <div
              key={wish.id}
              className={`paper-card p-6 rounded-xs tape-top flex flex-col justify-between ${
                index % 2 === 0 ? 'tape-top-clay -rotate-1' : 'tape-top-sage rotate-1'
              } ${isCompleted ? 'bg-[#FAF7F2]/90 border-[#D4A373]' : 'bg-white'}`}
            >
              <div>
                <div className="flex justify-between items-start gap-3 mb-2">
                  <h3 className="font-serif italic text-xl font-medium text-[#4A4541]">
                    {wish.title}
                  </h3>
                  {isCompleted && (
                    <span className="shrink-0 text-[10px] font-mono px-2.5 py-1 bg-[#9BAE96] text-white rounded-full flex items-center gap-1 shadow-xs">
                      <Gift className="w-3 h-3" /> 已结出果实
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#4A4541]/70 font-light leading-relaxed min-h-[40px]">
                  “{wish.storyNote}”
                </p>
              </div>

              {/* 绘本进度区 */}
              <div className="mt-6 pt-5 border-t border-dashed border-[#4A4541]/10">
                <div className="flex justify-between items-baseline text-xs font-mono text-[#4A4541]/80 mb-2">
                  <span>倾注星尘进度：</span>
                  <span className="font-bold text-[#D4A373]">
                    {wish.currentStardust} / {wish.targetStardust} ({progress}%)
                  </span>
                </div>

                {/* 柔软进度条 */}
                <div className="h-2 bg-black/5 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isCompleted ? 'bg-[#D4A373]' : 'bg-[#9BAE96]'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* 底部投喂交互 */}
                <div className="mt-4 flex items-center justify-between">
                  {isJustFed ? (
                    <span className="text-xs text-[#9BAE96] font-mono animate-fade-in flex items-center gap-1">
                      ✨ 愿望种子悄悄长高了！
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#4A4541]/40 font-mono">
                      {isCompleted ? '愿望已安然落地' : '完成微行动即可收集星尘'}
                    </span>
                  )}

                  {!isCompleted && (
                    <button
                      type="button"
                      onClick={() => handlePush(wish)}
                      disabled={userStardust <= 0}
                      className="px-4 py-1.5 bg-[#FAF7F2] hover:bg-[#D4A373] hover:text-white disabled:opacity-40 text-[#4A4541] border border-[#D4A373]/30 text-xs font-serif rounded-xs transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <span>倾注 10 星尘</span>
                      <Sparkles className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 新建愿望弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-2xs flex items-center justify-center p-4 z-50">
          <div className="paper-card tape-top p-8 rounded-xs max-w-md w-full bg-[#FFFDF9] animate-fade-in">
            <h3 className="font-serif italic text-2xl text-[#4A4541] mb-2">寄放一个新愿望</h3>
            <p className="text-xs text-[#4A4541]/60 mb-6 font-light">
              不用给这个目标设定截止日期。写下来，就是允许它发生。
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs text-[#4A4541]/70 block mb-1 font-mono">愿望的名称：</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例如：去海边呆一个下午 / 读完那本小册子"
                  className="w-full p-3 text-sm bg-white border border-[#4A4541]/15 rounded-xs text-[#4A4541] focus:outline-hidden focus:border-[#D4A373]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#4A4541]/70 block mb-1 font-mono">背后柔软的心事（选填）：</label>
                <textarea
                  value={storyNote}
                  onChange={(e) => setStoryNote(e.target.value)}
                  placeholder="为什么想做这件事？此刻脑海里浮现的画面是什么？"
                  className="w-full h-24 p-3 text-sm bg-white border border-[#4A4541]/15 rounded-xs text-[#4A4541] focus:outline-hidden focus:border-[#D4A373] resize-none font-light"
                />
              </div>

              <div>
                <label className="text-xs text-[#4A4541]/70 block mb-1 font-mono">所需的星尘养分量：</label>
                <select
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full p-2.5 text-xs bg-white border border-[#4A4541]/15 rounded-xs font-mono"
                >
                  <option value={50}>✦ 50 星尘（很轻松的微小小心愿）</option>
                  <option value={100}>✦ 100 星尘（值得期待的阶段性愿望）</option>
                  <option value={200}>✦ 200 星尘（需要沉淀一段时间的远方憧憬）</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2 bg-black/5 hover:bg-black/10 text-[#4A4541] text-xs rounded-xs font-serif"
                >
                  暂不许愿
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#4A4541] hover:bg-[#4A4541]/90 text-white text-xs font-serif tracking-wider rounded-xs shadow-xs"
                >
                  放进柜子
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
