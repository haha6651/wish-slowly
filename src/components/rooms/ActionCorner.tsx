import React, { useState, useEffect } from 'react';
import { Sparkles, Check, HeartHandshake, CloudSun, Coffee, Activity, Wind, Plus, Play, Pause, Square, Clock } from 'lucide-react';
import { MicroAction } from '../../types';

interface ActionCornerProps {
  actions: MicroAction[];
  onCompleteAction: (id: string, stardustReward: number) => void;
  onAddAction?: (act: MicroAction) => void;
  onBack: () => void;
}

export const ActionCorner: React.FC<ActionCornerProps> = ({ actions, onCompleteAction, onAddAction }) => {
  const [justCompletedId, setJustCompletedId] = useState<string | null>(null);
  
  // 自定义任务表单状态
  const [showAddForm, setShowAddForm] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [targetMins, setTargetMins] = useState(5);

  // 正向计时器状态
  const [activeTask, setActiveTask] = useState<{ id: string; title: string; startTime: number; elapsedSecs: number; targetMins: number } | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // 计时器嘀嗒
  useEffect(() => {
    let timer: number | null = null;
    if (activeTask && !isPaused) {
      timer = window.setInterval(() => {
        setActiveTask((prev) => prev ? { ...prev, elapsedSecs: prev.elapsedSecs + 1 } : null);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeTask, isPaused]);

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !onAddAction) return;

    const newAct: MicroAction = {
      id: `custom-act-${Date.now()}`,
      title: customTitle.trim(),
      desc: customDesc.trim() || `为自己定制的 ${targetMins} 分钟专属放松时间。`,
      energyLevel: '极低耗能',
      iconName: 'HeartHandshake',
      rewardStardust: Math.max(5, targetMins * 2),
      targetMinutes: targetMins,
      isCustom: true,
      completedToday: false,
    };

    onAddAction(newAct);
    setCustomTitle('');
    setCustomDesc('');
    setShowAddForm(false);
  };

  const startTimerForTask = (act: MicroAction) => {
    setActiveTask({
      id: act.id,
      title: act.title,
      startTime: Date.now(),
      elapsedSecs: 0,
      targetMins: act.targetMinutes || 5,
    });
    setIsPaused(false);
  };

  const handleFinishTimer = () => {
    if (!activeTask) return;
    const act = actions.find(a => a.id === activeTask.id);
    const reward = act ? act.rewardStardust : 15;
    onCompleteAction(activeTask.id, reward);
    setJustCompletedId(activeTask.id);
    setTimeout(() => setJustCompletedId(null), 2500);
    setActiveTask(null);
  };

  const handleDirectToggle = (act: MicroAction) => {
    if (act.completedToday) return;
    onCompleteAction(act.id, act.rewardStardust);
    setJustCompletedId(act.id);
    setTimeout(() => setJustCompletedId(null), 2000);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'CloudSun': return <CloudSun className="w-5 h-5 text-[#D4A373]" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-[#D4A373]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#9BAE96]" />;
      case 'Wind': return <Wind className="w-5 h-5 text-[#B8C5D6]" />;
      default: return <HeartHandshake className="w-5 h-5 text-[#E5B7B7]" />;
    }
  };

  const completedCount = actions.filter(a => a.completedToday).length;

  return (
    <div className="max-w-3xl mx-auto w-full p-6 md:p-10 select-none animate-fade-in">
      {/* 顶部标语 */}
      <div className="text-center mb-8 pb-6 border-b border-[#4A4541]/10">
        <h2 className="font-serif italic text-3xl text-[#4A4541]">行动角</h2>
        <p className="text-xs text-[#4A4541]/60 mt-2 font-light max-w-md mx-auto leading-relaxed">
          这里没有高压的任务清单。当你累到连“开始”都觉得困难时，做一件极度微小、毫无心理负担的事就好。
        </p>
      </div>

      {/* 正向计时横幅（开启陪伴时常驻） */}
      {activeTask && (
        <div className="paper-card tape-top tape-top-sage p-6 rounded-xs mb-8 bg-[#FAF7F2] border-2 border-[#9BAE96] shadow-md animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-[#9BAE96] text-white flex items-center justify-center font-mono text-lg font-bold shadow-sm animate-pulse">
                ⏳
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9BAE96] font-bold block">
                  ✦ 正向陪伴计时进行中
                </span>
                <h4 className="font-serif italic text-lg text-[#4A4541]">
                  “{activeTask.title}”
                </h4>
                <p className="text-xs text-[#4A4541]/70 font-mono mt-1">
                  目标陪伴设定：{activeTask.targetMins} 分钟
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-2">
              <div className="text-xs font-serif text-[#4A4541]/60">我陪伴你多久了：</div>
              <div className="text-3xl font-mono font-bold text-[#D4A373] tracking-widest bg-white px-4 py-1.5 rounded-xs border border-[#D4A373]/30 shadow-inner">
                {formatTime(activeTask.elapsedSecs)}
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="px-3 py-1 bg-white hover:bg-black/5 text-[#4A4541] border border-[#4A4541]/20 rounded-xs text-xs font-serif flex items-center gap-1 cursor-pointer"
                >
                  {isPaused ? <Play className="w-3 h-3 text-[#9BAE96]" /> : <Pause className="w-3 h-3 text-[#D4A373]" />}
                  <span>{isPaused ? '继续陪伴' : '暂停'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinishTimer}
                  className="px-4 py-1 bg-[#9BAE96] hover:bg-[#9BAE96]/90 text-white rounded-xs text-xs font-serif tracking-wider shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>完成并领取星尘</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTask(null)}
                  className="p-1.5 text-[#4A4541]/40 hover:text-[#4A4541] text-xs cursor-pointer"
                  title="结束计时"
                >
                  <Square className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 顶栏指南与自定义按钮 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="paper-card p-4 rounded-xs bg-[#FCF9F2] flex items-center gap-3 flex-1 w-full border border-[#9BAE96]/20">
          <div className="w-8 h-8 rounded-full bg-[#9BAE96]/20 flex items-center justify-center text-[#9BAE96] shrink-0">
            ✦
          </div>
          <div className="text-xs">
            <span className="text-[#4A4541]/70">今日已与身体重新连接 </span>
            <span className="font-mono font-bold text-[#9BAE96] text-sm">{completedCount}</span>
            <span className="text-[#4A4541]/70"> 次，每完成一个微行动获赠温柔星尘</span>
          </div>
        </div>

        {onAddAction && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full sm:w-auto px-5 py-3 bg-[#4A4541] hover:bg-[#4A4541]/90 text-[#FDFBF7] text-xs font-serif tracking-wider rounded-xs transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4 text-[#D4A373]" />
            <span>自定义任务和时间</span>
          </button>
        )}
      </div>

      {/* 自定义微任务表单 */}
      {showAddForm && (
        <form onSubmit={handleCreateCustom} className="paper-card tape-top p-6 rounded-xs mb-8 bg-[#FFFDF9] space-y-4 animate-fade-in border border-[#D4A373]/40">
          <div className="flex justify-between items-center pb-2 border-b border-[#4A4541]/10">
            <h4 className="font-serif italic text-base text-[#4A4541]">定制你的微小放松时光</h4>
            <span className="text-[11px] font-mono text-[#D4A373]">完全随心设定</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-[#4A4541]/70 block mb-1">行动名称：</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="例如：敷一片冷敷贴 / 听完一首纯音乐"
                className="w-full p-2.5 text-xs bg-white border border-[#4A4541]/15 rounded-xs focus:outline-hidden focus:border-[#D4A373]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#4A4541]/70 block mb-1">设定目标陪伴时长（分钟）：</label>
              <select
                value={targetMins}
                onChange={(e) => setTargetMins(Number(e.target.value))}
                className="w-full p-2.5 text-xs bg-white border border-[#4A4541]/15 rounded-xs font-mono text-[#4A4541]"
              >
                <option value={1}>⏱ 1 分钟（深呼吸或发会儿呆）</option>
                <option value={3}>⏱ 3 分钟（伸展一下肩颈背部）</option>
                <option value={5}>⏱ 5 分钟（喝一杯热水或放空）</option>
                <option value={10}>⏱ 10 分钟（听会儿舒缓白噪音）</option>
                <option value={20}>⏱ 20 分钟（小憩或闭目养神）</option>
                <option value={30}>⏱ 30 分钟（完全放下手机休憩）</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-[#4A4541]/70 block mb-1">温柔备注说明（选填）：</label>
            <input
              type="text"
              value={customDesc}
              onChange={(e) => setCustomDesc(e.target.value)}
              placeholder="例如：什么都不想，让思绪随风飘一会儿"
              className="w-full p-2.5 text-xs bg-white border border-[#4A4541]/15 rounded-xs focus:outline-hidden focus:border-[#D4A373] font-light"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-1.5 text-xs text-[#4A4541]/60 hover:text-[#4A4541] font-serif"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-1.5 bg-[#D4A373] hover:bg-[#D4A373]/90 text-white rounded-xs text-xs font-serif tracking-wider shadow-2xs cursor-pointer"
            >
              放进行动角
            </button>
          </div>
        </form>
      )}

      {/* 行动卡片列表 */}
      <div className="space-y-4">
        {actions.map((act) => {
          const isDone = act.completedToday;
          const isJustDone = justCompletedId === act.id;
          const isCurrentActive = activeTask?.id === act.id;

          return (
            <div
              key={act.id}
              className={`paper-card p-5 rounded-xs transition-all flex items-start gap-4 ${
                isDone ? 'bg-[#F9FBF8]/80 border-[#9BAE96]/30 opacity-70' : isCurrentActive ? 'bg-[#FAF7F2] border-[#9BAE96] ring-1 ring-[#9BAE96]' : 'bg-white hover:border-[#D4A373]'
              }`}
            >
              {/* 勾选圈圈图标 */}
              <div
                onClick={() => handleDirectToggle(act)}
                className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                  isDone
                    ? 'bg-[#9BAE96] text-white shadow-xs scale-105'
                    : 'border-2 border-[#4A4541]/20 hover:border-[#D4A373]'
                }`}
                title={isDone ? '今日已连接' : '点击直接标记完成'}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-[10px] text-[#D4A373] opacity-0 hover:opacity-100">●</span>}
              </div>

              {/* 内容区 */}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-medium transition-all ${isDone ? 'line-through text-[#4A4541]/50' : 'text-[#4A4541]'}`}>
                      {act.title}
                    </h3>
                    {act.isCustom && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-2xs bg-[#D4A373]/15 text-[#D4A373]">
                        专属定制
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-[#FAF7F2] text-[#4A4541]/60">
                      {act.targetMinutes ? `${act.targetMinutes}分钟` : act.energyLevel}
                    </span>
                    <span className="flex items-center gap-0.5 text-xs font-mono text-[#D4A373] font-medium">
                      +{act.rewardStardust} <Sparkles className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#4A4541]/65 font-light mt-1.5 leading-relaxed">
                  {act.desc}
                </p>

                {/* 底部功能栏：正向计时触发 */}
                <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between">
                  {isJustDone ? (
                    <div className="text-xs font-mono text-[#9BAE96] flex items-center gap-1 animate-pulse">
                      <span>✨ 真棒！身体收到了这份轻柔的讯号 (+{act.rewardStardust}星尘)</span>
                    </div>
                  ) : isDone ? (
                    <span className="text-[11px] font-mono text-[#4A4541]/40">今日已安然完成</span>
                  ) : isCurrentActive ? (
                    <span className="text-xs font-mono text-[#9BAE96] font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 animate-spin" /> 正在上方为你正向计时...
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startTimerForTask(act)}
                      className="text-xs font-serif text-[#D4A373] hover:text-[#4A4541] flex items-center gap-1 cursor-pointer transition-colors bg-[#FAF7F2] px-3 py-1 rounded-xs border border-[#D4A373]/30"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>开启陪伴计时（我陪伴你多久了）</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 右侧微图标 */}
              <div className="hidden sm:block opacity-40 self-center">
                {getIcon(act.iconName)}
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部寄语 */}
      <div className="mt-12 text-center text-xs text-[#4A4541]/40 font-mono italic">
        “完成5%也是伟大的100%。不急，今天先到这里就很好了。”
      </div>
    </div>
  );
};
