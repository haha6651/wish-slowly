import React, { useState } from 'react';
import { Camera, Plus, Sparkles, Check } from 'lucide-react';
import { DiaryEntry } from '../../types';

interface DiaryRoomProps {
  diaries: DiaryEntry[];
  onAddDiary: (entry: DiaryEntry) => void;
  onBack: () => void;
}

const PRESET_TAGS = [
  '☀️ 窗外的光线',
  '🍵 一杯温润的水',
  '🍃 街角新绿的树',
  '✅ 完成一件小事后',
  '🌙 深夜安静的片刻',
  '🐱 路上遇到的小动物',
];

const MOODS = ['平静舒展', '略微疲惫', '被温柔包裹', '有些迷茫', '充实满足'];

export const DiaryRoom: React.FC<DiaryRoomProps> = ({ diaries, onAddDiary }) => {
  const [momentNote, setMomentNote] = useState('');
  const [selectedTag, setSelectedTag] = useState(PRESET_TAGS[0]);
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!momentNote.trim() && !uploadedImg) return;

    const newEntry: DiaryEntry = {
      id: `diary-${Date.now()}`,
      dateStr: new Date().toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      momentNote: momentNote.trim() || '记录下一个安静的片刻。',
      imageUrl: uploadedImg || undefined,
      presetTag: selectedTag,
      moodLabel: selectedMood,
      createdAt: Date.now(),
    };

    onAddDiary(newEntry);
    setMomentNote('');
    setUploadedImg(null);
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-6 md:p-10 select-none animate-fade-in">
      {/* 顶部温情文案 */}
      <div className="text-center mb-8 pb-6 border-b border-[#4A4541]/10">
        <h2 className="font-serif italic text-3xl text-[#4A4541]">日记房</h2>
        <p className="text-xs text-[#4A4541]/60 mt-2 font-light max-w-md mx-auto leading-relaxed">
          情绪不一定总能被精准的语言表达出来，但一个瞬间可以。你不需要写得很完整，只要留下一个剪影，也是在照顾自己。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* 左侧：留下今日瞬间表单 */}
        <div className="md:col-span-7 paper-card p-6 md:p-8 rounded-xs tape-top bg-[#FFFDF9]">
          <h3 className="font-serif italic text-lg text-[#4A4541] mb-4 flex items-center gap-2">
            <span>✦</span> 记录现在的剪影
          </h3>

          <form onSubmit={handleSave} className="space-y-5">
            {/* 灵感标签选择 */}
            <div>
              <label className="text-xs text-[#4A4541]/60 block mb-2 font-mono">可以选择一个视角标签：</label>
              <div className="flex flex-wrap gap-2">
                {PRESET_TAGS.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                      selectedTag === tag
                        ? 'bg-[#E5B7B7] text-[#4A4541] font-medium shadow-xs'
                        : 'bg-[#FAF7F2] text-[#4A4541]/70 hover:bg-[#FAF7F2]/80 border border-[#4A4541]/5'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 心情状态词 */}
            <div>
              <label className="text-xs text-[#4A4541]/60 block mb-2 font-mono">此刻身体的感觉：</label>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setSelectedMood(m)}
                    className={`text-xs px-3 py-1 rounded-sm transition-colors ${
                      selectedMood === m
                        ? 'bg-[#9BAE96] text-white'
                        : 'bg-black/5 text-[#4A4541]/60 hover:text-[#4A4541]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* 文本输入 */}
            <div>
              <textarea
                value={momentNote}
                onChange={(e) => setMomentNote(e.target.value)}
                placeholder="随手写下一两句今天的思绪……（也可以不写，光发呆看图就行）"
                className="w-full h-28 p-3.5 text-sm bg-[#FAF7F2]/50 border border-[#4A4541]/10 rounded-xs text-[#4A4541] placeholder-[#4A4541]/35 focus:outline-hidden focus:border-[#D4A373] transition-colors resize-none leading-relaxed font-light"
              />
            </div>

            {/* 图片上传区域（拍立得效果预览） */}
            <div>
              <label className="flex items-center gap-2 text-xs text-[#4A4541]/70 cursor-pointer w-fit hover:text-[#D4A373] transition-colors">
                <Camera className="w-4 h-4" />
                <span>{uploadedImg ? '重新选择镜头截图' : '上传一张随手拍 / 截图'}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>

              {uploadedImg && (
                <div className="mt-3 polaroid-frame w-48 rotate-1">
                  <img src={uploadedImg} alt="moment preview" className="w-full aspect-square object-cover bg-black/5" />
                  <p className="text-[10px] text-center font-serif italic mt-2 text-[#4A4541]/60 truncate">
                    {selectedTag}
                  </p>
                </div>
              )}
            </div>

            {/* 提交反馈 */}
            <div className="pt-2 flex items-center justify-between">
              {showSavedMsg && (
                <span className="text-xs text-[#9BAE96] flex items-center gap-1 font-mono animate-fade-in">
                  <Check className="w-3.5 h-3.5" /> 已贴上日记墙 (+10星尘)
                </span>
              )}
              <button
                type="submit"
                disabled={!momentNote.trim() && !uploadedImg}
                className="ml-auto px-6 py-2 bg-[#4A4541] hover:bg-[#4A4541]/90 disabled:opacity-30 text-[#FDFBF7] text-xs font-serif tracking-wider rounded-xs transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>留存瞬间</span>
              </button>
            </div>
          </form>
        </div>

        {/* 右侧：绘本相册回廊（历史记录） */}
        <div className="md:col-span-5 space-y-6">
          <h3 className="font-serif italic text-base text-[#4A4541]/70 tracking-wide">
            往期瞬间剪影 ({diaries.length})
          </h3>

          <div className="space-y-5 max-h-[500px] overflow-y-auto pr-1">
            {diaries.map((diary, i) => (
              <div
                key={diary.id}
                className={`paper-card p-4 rounded-xs ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
              >
                <div className="flex justify-between items-center text-[11px] font-mono text-[#4A4541]/50 mb-2">
                  <span>{diary.dateStr}</span>
                  <span className="px-2 py-0.5 bg-[#FAF7F2] text-[#D4A373] rounded-full">
                    {diary.moodLabel}
                  </span>
                </div>

                {diary.imageUrl && (
                  <div className="mb-3 polaroid-frame w-full">
                    <img src={diary.imageUrl} alt="moment" className="w-full h-36 object-cover bg-black/5" />
                  </div>
                )}

                <p className="text-xs text-[#4A4541]/80 font-light leading-relaxed whitespace-pre-wrap">
                  {diary.momentNote}
                </p>
                <div className="mt-2.5 pt-2 border-t border-dashed border-[#4A4541]/10 text-[10px] text-[#9BAE96] font-mono">
                  {diary.presetTag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
