import React, { useState } from 'react';
import { Sparkles, RefreshCw, Lock, Compass, Sparkle, MoonStar, BookOpen } from 'lucide-react';
import { StarlightCard, DivinationResult } from '../../types';

interface StarlightCardsProps {
  cards: StarlightCard[];
  onUnlockCard: (id: string) => void;
  onBack: () => void;
}

const TAROT_DECK: DivinationResult[] = [
  {
    type: 'tarot',
    name: '0. 愚人 (The Fool)',
    symbol: '🃏',
    keywords: ['崭新起点', '卸下包袱', '随心所欲'],
    meaning: '愚人站在悬崖边，身背小包裹，却满怀期待与轻盈。这张牌准确预示着：你当前担心的“未知与变数”，其实正是生命力与新机遇的所在。',
    guidance: '不要执着于必须制定100%完美无缺的计划才敢行动。允许自己带着一点天真与愚拙，先迈出那半步，风会托住你。'
  },
  {
    type: 'tarot',
    name: 'II. 女祭司 (The High Priestess)',
    symbol: '🌙',
    keywords: ['内在智慧', '直觉沉淀', '宁静自察'],
    meaning: '女祭司端坐于黑白两柱之间，手捧智慧卷轴。她象征着不言而喻的直觉力，以及向内觉察的深邃疗愈力。',
    guidance: '外界纷杂的声音与建议已经够多了。今晚试着关掉手机发呆5分钟，倾听你心底最轻微的直觉讯号——关于那件事，你其实早有答案。'
  },
  {
    type: 'tarot',
    name: 'IX. 隐士 (The Hermit)',
    symbol: '🏮',
    keywords: ['独处修复', '寻回心光', '主动沉淀'],
    meaning: '隐士在雪夜中高举真理之灯，独自行走。这不是孤独或被孤立，而是智者主动屏蔽喧嚣，为自己的内心点灯。',
    guidance: '近期若觉得与周围的人隔着一层玻璃，别害怕。这是你的身心在主动申请一段“节能休眠期”，在高质量的独处中把消耗的能量慢悠悠补回来。'
  },
  {
    type: 'tarot',
    name: 'XVII. 星星 (The Star)',
    symbol: '⭐',
    keywords: ['治愈洗涤', '纯粹希望', '紧绷释放'],
    meaning: '在经历了高压与变动后，星星牌代表夜空中最清澈洗涤的光芒，生命之水重新灌溉干涸的土壤。',
    guidance: '最艰难、最紧绷的节点已经悄悄过去。现在的你就像被暴雨洗刷过的夜空，紧绷的神经正被宇宙温柔接住，安心睡吧。'
  },
  {
    type: 'tarot',
    name: 'VIII. 力量 (Strength)',
    symbol: '🦁',
    keywords: ['以柔克刚', '柔软坚韧', '接纳自我'],
    meaning: '身穿白衣的女子，不费吹灰之力，只是温柔地抚摸着雄狮的额头。真正的力量决不是嘶吼与强压，而是克制、温柔与包容。',
    guidance: '对待内心的焦虑与拖延，不需要拿鞭子鞭挞自己。像安抚那只暴躁的狮子一样，拍拍自己的肩膀说“没关系，今天我已经做得够好了”。'
  },
  {
    type: 'tarot',
    name: 'XIV. 节制 (Temperance)',
    symbol: '⚖️',
    keywords: ['平衡细流', '能量交融', '缓慢过渡'],
    meaning: '天使两手各持一壶，将圣水在两壶间流畅倒转。它象征着工作与休憩、付出与接纳之间绝妙的动态平衡。',
    guidance: '别把自己逼入极端的“疯狂内卷”或“极度自责的摆烂”。允许一切缓慢过渡，在日常的一杯温水和按时吃饭中找回生活的节律。'
  }
];

const LIUYAO_DECK: DivinationResult[] = [
  {
    type: 'liuyao',
    name: '地天泰 (泰卦 · 周易第11卦)',
    symbol: '䷊',
    keywords: ['否极泰来', '阴阳交泰', '万物萌生'],
    meaning: '上坤下乾，地气上升，天气下降，天地二气互相交感和谐。古断：小往大来，吉亨。象征瓶颈融化，阻碍消除。',
    guidance: '你此前默默承载的压力和付出，正处于“由量变转向质变”的转折点。顺应自然节律，心宽体稳，美好的转机正顺着晚风赶来。'
  },
  {
    type: 'liuyao',
    name: '水火既济 (既济卦 · 周易第63卦)',
    symbol: '䷾',
    keywords: ['功成圆满', '水火既济', '结构稳妥'],
    meaning: '坎水居上，离火居下，火势向上烧水，水势向下灭火，恰到好处的动态制衡。预示当前局势已然安定圆满。',
    guidance: '你当下忧虑纠结的事情，内在结构其实已经相当稳妥安妥。不必过度杞人忧天，保持平常心，维系现有的安稳步伐即可。'
  },
  {
    type: 'liuyao',
    name: '风雷益 (益卦 · 周易第42卦)',
    symbol: '䷩',
    keywords: ['顺势腾飞', '得到助力', '其道大光'],
    meaning: '上风下雷，风雷交加，助长万物生机声势。古判：损上益下，利有攸往，利涉大川。',
    guidance: '若心中有想做已久的微小改变（如培养新习惯），现在正是顺风扬帆的好时机。别因自我怀疑而推辞生命馈赠给你的助力。'
  },
  {
    type: 'liuyao',
    name: '山水蒙 (蒙卦 · 周易第4卦)',
    symbol: '䷃',
    keywords: ['启蒙求索', '虚心蓄力', '允许未知'],
    meaning: '艮山在坎水之上，山雾缭绕，泉水初生于山涧，尚未汇成大江，处于蒙昧求索阶段。山下有险，险而止。',
    guidance: '感到短暂的迷茫或看不清前路，是生命在孕育新知时的标准模具。允许自己当一个“什么都还不知道”的孩童，不急着立刻要满分标准答案。'
  },
  {
    type: 'liuyao',
    name: '坤为地 (坤卦 · 周易第2卦)',
    symbol: '䷁',
    keywords: ['厚德载物', '顺应时机', '静观其变'],
    meaning: '六爻纯阴，极尽包容承载之能。大地不言，却生养万物，顺应四时而不急躁。柔顺利贞。',
    guidance: '当前面对困惑的最佳策略不是盲目冲刺，而是“静观其变、厚积薄发”。像宽厚的大地一样接纳情绪的起伏，静待春风拂面。'
  },
  {
    type: 'liuyao',
    name: '雷地豫 (豫卦 · 周易第16卦)',
    symbol: '䷏',
    keywords: ['欢欣鼓舞', '灵感破土', '顺应天时'],
    meaning: '震雷轰鸣于宽厚的大地之上，蛰伏的生灵应声而起，欢欣鼓舞，顺应天时。预示沉闷紧绷的空气即将被打破。',
    guidance: '给自己创造一点纯粹快乐的源泉（听一首绝赞的好歌、放空散步）。愉悦与松弛感，才是唤醒你沉睡行动力的最强大魔法。'
  }
];

export const StarlightCards: React.FC<StarlightCardsProps> = ({ cards, onUnlockCard }) => {
  const [mode, setMode] = useState<'cards' | 'divination'>('cards');
  
  // 抽卡状态
  const [activeCardId, setActiveCardId] = useState<string>(cards[0]?.id || 'sc-1');
  const [isDrawing, setIsDrawing] = useState(false);

  // 占卜状态
  const [divType, setDivType] = useState<'tarot' | 'liuyao'>('tarot');
  const [question, setQuestion] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [divResult, setDivResult] = useState<DivinationResult | null>(null);

  const handleDrawRandomCard = () => {
    setIsDrawing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * cards.length);
      const drawnCard = cards[randomIndex];
      if (drawnCard) {
        setActiveCardId(drawnCard.id);
        if (!drawnCard.unlocked) {
          onUnlockCard(drawnCard.id);
        }
      }
      setIsDrawing(false);
    }, 600);
  };

  const handleStartDivination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isShaking) return;

    setIsShaking(true);
    setDivResult(null);

    setTimeout(() => {
      const deck = divType === 'tarot' ? TAROT_DECK : LIUYAO_DECK;
      const res = deck[Math.floor(Math.random() * deck.length)] || deck[0];
      setDivResult(res);
      setIsShaking(false);
    }, 1500);
  };

  const activeCard = cards.find((c) => c.id === activeCardId) || cards[0];

  return (
    <div className="max-w-3xl mx-auto w-full p-6 md:p-10 select-none animate-fade-in">
      {/* 顶部模式切换导航 */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#FAF7F2] p-1 rounded-xs border border-[#4A4541]/10 flex gap-1 font-serif text-xs">
          <button
            onClick={() => setMode('cards')}
            className={`px-5 py-2 rounded-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'cards' ? 'bg-[#4A4541] text-[#FDFBF7] shadow-xs font-medium' : 'text-[#4A4541]/70 hover:text-[#4A4541]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>情绪纸条簿</span>
          </button>
          <button
            onClick={() => setMode('divination')}
            className={`px-5 py-2 rounded-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'divination' ? 'bg-[#4A4541] text-[#FDFBF7] shadow-xs font-medium' : 'text-[#4A4541]/70 hover:text-[#4A4541]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>慢语轻占卜（塔罗/六爻）</span>
          </button>
        </div>
      </div>

      {mode === 'cards' ? (
        <>
          {/* 顶部标语 */}
          <div className="text-center mb-8 pb-6 border-b border-[#4A4541]/10">
            <h2 className="font-serif italic text-3xl text-[#4A4541]">星光卡</h2>
            <p className="text-xs text-[#4A4541]/60 mt-2 font-light max-w-md mx-auto leading-relaxed">
              写给疲惫大人的情绪纸条。当世界都在催促你快跑时，随手抽一张，允许自己缓慢下来。
            </p>
          </div>

          {/* 核心抽卡展示舞台 */}
          <div className="flex flex-col items-center justify-center my-8">
            <div
              className={`paper-card tape-top tape-top-sage p-10 md:p-14 max-w-md w-full rounded-xs text-center transition-all duration-500 bg-[#FFFDF9] ${
                isDrawing ? 'scale-95 opacity-50 rotate-3 blur-2xs' : '-rotate-1 shadow-md'
              }`}
            >
              <div className="w-10 h-10 mx-auto mb-6 rounded-full bg-[#FAF7F2] border border-[#9BAE96]/30 flex items-center justify-center text-[#9BAE96] font-serif text-lg">
                ✦
              </div>

              <p className="text-base md:text-lg font-serif italic text-[#4A4541] leading-relaxed mb-8 select-text">
                “{activeCard ? activeCard.quote : '发呆也是生命的养分。'}”
              </p>

              <div className="pt-6 border-t border-dashed border-[#4A4541]/10 flex justify-between items-center text-xs font-mono text-[#4A4541]/50">
                <span>#{activeCard?.theme}</span>
                <span>— {activeCard?.author}</span>
              </div>
            </div>

            {/* 抽卡互动按钮 */}
            <button
              onClick={handleDrawRandomCard}
              disabled={isDrawing}
              className="mt-8 px-8 py-3 bg-[#9BAE96] hover:bg-[#9BAE96]/90 text-white rounded-full font-serif text-xs tracking-widest shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDrawing ? 'animate-spin' : ''}`} />
              <span>随机抽取一张情绪纸条</span>
            </button>
          </div>

          {/* 纸条收集架子 */}
          <div className="mt-16 pt-8 border-t border-[#4A4541]/10">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-serif italic text-sm text-[#4A4541]/70">
                已开启的纸条簿 ({cards.filter(c => c.unlocked).length} / {cards.length})
              </h4>
              <span className="text-[11px] font-mono text-[#4A4541]/40">点击可重新回顾</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {cards.map((card, idx) => {
                const isUnlocked = card.unlocked;
                const isCurr = card.id === activeCard?.id;

                return (
                  <div
                    key={card.id}
                    onClick={() => isUnlocked && setActiveCardId(card.id)}
                    className={`p-4 rounded-xs border text-xs font-mono transition-all flex flex-col justify-between min-h-[90px] ${
                      isCurr
                        ? 'bg-[#FAF7F2] border-[#D4A373] shadow-xs scale-102'
                        : isUnlocked
                        ? 'bg-white border-[#4A4541]/8 hover:border-[#9BAE96] cursor-pointer'
                        : 'bg-black/5 border-transparent opacity-40 select-none'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-[#4A4541]/60">#{idx + 1}</span>
                      {!isUnlocked && <Lock className="w-3 h-3 text-[#4A4541]/50" />}
                    </div>

                    <p className="font-serif italic text-[11px] text-[#4A4541]/80 line-clamp-2 mt-1">
                      {isUnlocked ? `“${card.quote}”` : '待抽选开启'}
                    </p>

                    <div className="mt-2 text-[9px] text-[#9BAE96] truncate">
                      {isUnlocked ? card.theme : '✦✦✦'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* 占卜视图 (塔罗/六爻) */
        <div className="animate-fade-in space-y-8">
          <div className="text-center pb-6 border-b border-[#4A4541]/10">
            <h2 className="font-serif italic text-3xl text-[#4A4541]">慢语轻占卜</h2>
            <p className="text-xs text-[#4A4541]/60 mt-2 font-light max-w-md mx-auto leading-relaxed">
              古老的塔罗与周易六爻，并非为了宿命论式的算命，而是借由宇宙的潜意识符号，帮迷茫疲惫的你梳理心绪、指引方向。
            </p>
          </div>

          {/* 占卜表单区域 */}
          <div className="paper-card tape-top tape-top-amber p-8 rounded-xs bg-[#FFFDF9] border border-[#D4A373]/30 shadow-sm max-w-xl mx-auto">
            <form onSubmit={handleStartDivination} className="space-y-6">
              <div>
                <label className="text-xs font-mono text-[#4A4541]/70 block mb-2">① 选择诚心祈测的方式：</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDivType('tarot')}
                    className={`p-3 rounded-xs border text-xs font-serif transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      divType === 'tarot' ? 'bg-[#FAF7F2] border-[#D4A373] text-[#D4A373] font-bold shadow-2xs ring-1 ring-[#D4A373]' : 'bg-white border-[#4A4541]/10 text-[#4A4541]/70'
                    }`}
                  >
                    <MoonStar className="w-4 h-4" />
                    <span>西方塔罗占卜 (Tarot)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDivType('liuyao')}
                    className={`p-3 rounded-xs border text-xs font-serif transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      divType === 'liuyao' ? 'bg-[#FAF7F2] border-[#D4A373] text-[#D4A373] font-bold shadow-2xs ring-1 ring-[#D4A373]' : 'bg-white border-[#4A4541]/10 text-[#4A4541]/70'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>周易六爻占卜 (Liuyao)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#4A4541]/70 block mb-1">② 默念你近期在纠结或思索的事情：</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="例如：关于目前这段瓶颈期的工作 / 近期的心绪指引"
                  disabled={isShaking}
                  className="w-full p-3 text-xs md:text-sm bg-[#FAF7F2] border border-[#4A4541]/15 rounded-xs text-[#4A4541] placeholder-[#4A4541]/35 focus:outline-hidden focus:border-[#D4A373]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!question.trim() || isShaking}
                className="w-full py-3.5 bg-[#4A4541] hover:bg-[#4A4541]/90 disabled:opacity-30 text-[#FDFBF7] rounded-xs font-serif text-xs tracking-widest transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                {isShaking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#D4A373]" />
                    <span>{divType === 'tarot' ? '牌阵正在星空中缓慢洗牌选出...' : '铜钱正在虚空中轻柔摇动起卦...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkle className="w-4 h-4 text-[#D4A373]" />
                    <span>开始静心启测</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* 占卜结果展示牌位 */}
          {divResult && (
            <div className="paper-card tape-top tape-top-sage p-8 md:p-10 rounded-xs bg-white border-2 border-[#D4A373] shadow-md max-w-xl mx-auto animate-fade-in space-y-6">
              <div className="text-center pb-4 border-b border-black/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A373] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#D4A373]/20 inline-block mb-3 font-bold">
                  ✦ {divResult.type === 'tarot' ? '塔罗星辰指引' : '周易六爻卦象'}
                </span>
                <div className="text-5xl my-2 select-none animate-bounce">{divResult.symbol}</div>
                <h3 className="font-serif italic text-2xl text-[#4A4541] font-medium">{divResult.name}</h3>
                
                <div className="flex justify-center gap-2 mt-3">
                  {divResult.keywords.map((kw) => (
                    <span key={kw} className="text-[11px] font-mono px-2.5 py-0.5 bg-black/5 text-[#4A4541]/80 rounded-xs">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs md:text-sm leading-relaxed text-[#4A4541]/85 font-light">
                <h4 className="font-serif italic font-medium text-[#4A4541] text-xs">牌意/卦象解读：</h4>
                <p className="bg-[#FAF7F2] p-4 rounded-xs border border-[#4A4541]/5 whitespace-pre-wrap select-text">
                  {divResult.meaning}
                </p>
              </div>

              <div className="space-y-2 text-xs md:text-sm leading-relaxed text-[#9BAE96]">
                <h4 className="font-serif italic font-bold text-[#9BAE96] text-xs flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> 给疲惫大人的疗愈心路指引：
                </h4>
                <p className="bg-[#F9FBF8] p-4 rounded-xs border border-[#9BAE96]/20 text-[#4A4541]/90 font-light whitespace-pre-wrap select-text">
                  {divResult.guidance}
                </p>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setDivResult(null)}
                  className="text-xs text-[#4A4541]/40 hover:text-[#4A4541] font-mono underline cursor-pointer"
                >
                  致敬宇宙与潜意识，收起本次占卜
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
