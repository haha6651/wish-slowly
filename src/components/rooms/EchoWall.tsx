import React, { useState } from 'react';
import { Send, Heart, Star, Moon, Leaf, MessageCircleHeart, Image as ImageIcon, MessageSquare, ThumbsUp } from 'lucide-react';
import { EchoPost, EchoComment } from '../../types';
import { INITIAL_ECHOES } from '../../data/initialData';

interface EchoWallProps {
  onBack: () => void;
}

const BG_THEMES: Array<{ key: EchoPost['bgTheme']; name: string; bg: string; text: string }> = [
  { key: 'sky', name: '晴空蓝', bg: 'bg-[#B8C5D6]', text: 'text-white' },
  { key: 'rose', name: '晚霞粉', bg: 'bg-[#E5B7B7]', text: 'text-[#4A4541]' },
  { key: 'sage', name: '森林绿', bg: 'bg-[#9BAE96]', text: 'text-white' },
  { key: 'amber', name: '麦穗黄', bg: 'bg-[#D4A373]', text: 'text-white' },
];

export const EchoWall: React.FC<EchoWallProps> = () => {
  const [posts, setPosts] = useState<EchoPost[]>(INITIAL_ECHOES);
  
  // 发表新回声状态
  const [content, setContent] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<EchoPost['bgTheme']>('sky');
  const [showPhotoInput, setShowPhotoInput] = useState(false);

  // 点赞互动记录
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  
  // 展开评论与新评论输入框状态
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentInputMap, setCommentInputMap] = useState<Record<string, string>>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEcho: EchoPost = {
      id: `echo-${Date.now()}`,
      content: content.trim(),
      moodTag: '来自远方的慢语',
      timestamp: '刚刚',
      imageUrl: photoUrl.trim() || undefined,
      reactions: { hug: 1, star: 0, moon: 0, leaf: 0 },
      comments: [],
      bgTheme: selectedTheme,
    };

    setPosts((prev) => [newEcho, ...prev]);
    setContent('');
    setPhotoUrl('');
    setShowPhotoInput(false);
  };

  const handleReact = (postId: string, rType: keyof EchoPost['reactions']) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            reactions: {
              ...p.reactions,
              [rType]: p.reactions[rType] + 1,
            },
          };
        }
        return p;
      })
    );
  };

  const handleToggleLike = (postId: string) => {
    if (likedMap[postId]) return;
    setLikedMap((prev) => ({ ...prev, [postId]: true }));
    handleReact(postId, 'hug');
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputMap[postId]?.trim();
    if (!text) return;

    const newComment: EchoComment = {
      id: `com-${Date.now()}`,
      author: '远方的过客',
      text,
      timestamp: '刚刚',
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, comments: [...(p.comments || []), newComment] };
        }
        return p;
      })
    );

    setCommentInputMap((prev) => ({ ...prev, [postId]: '' }));
  };

  const getThemeClass = (theme: EchoPost['bgTheme']) => {
    switch (theme) {
      case 'rose': return 'bg-[#E5B7B7] text-[#4A4541]';
      case 'sage': return 'bg-[#9BAE96] text-white';
      case 'amber': return 'bg-[#D4A373] text-white';
      default: return 'bg-[#B8C5D6] text-white';
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-6 md:p-10 select-none animate-fade-in">
      {/* 顶部标语 */}
      <div className="text-center mb-8 pb-6 border-b border-[#4A4541]/10">
        <h2 className="font-serif italic text-3xl text-[#4A4541]">回声墙</h2>
        <p className="text-xs text-[#4A4541]/60 mt-2 font-light max-w-md mx-auto leading-relaxed">
          这里没有高压的社交评论区，也没有排名焦虑。你可以匿名写下今天的疲惫、确切幸福或上传一张秋日的剪影照，远方的陌生人会轻柔点赞并为你写下温暖的回应。
        </p>
      </div>

      {/* 顶部发表纸条框 */}
      <div className="paper-card tape-top p-6 rounded-xs mb-10 bg-[#FFFDF9]">
        <h3 className="font-serif italic text-base text-[#4A4541] mb-3 flex items-center gap-1.5">
          <MessageCircleHeart className="w-4 h-4 text-[#E5B7B7]" />
          <span>贴上一张匿名树洞纸片（支持文字与照片）</span>
        </h3>

        <form onSubmit={handlePost} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今晚你想留在回声墙上的心声……"
            className="w-full h-24 p-3 text-xs md:text-sm bg-[#FAF7F2] border border-[#4A4541]/10 rounded-xs text-[#4A4541] placeholder-[#4A4541]/35 focus:outline-hidden focus:border-[#D4A373] transition-colors resize-none font-light"
            required
          />

          {/* 照片上传预览区 */}
          {showPhotoInput && (
            <div className="p-3 bg-[#FAF7F2] rounded-xs border border-dashed border-[#D4A373]/50 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#4A4541]/70">上传照片剪影：</span>
                <button
                  type="button"
                  onClick={() => { setShowPhotoInput(false); setPhotoUrl(''); }}
                  className="text-[11px] text-[#4A4541]/50 hover:text-[#4A4541]"
                >
                  移除照片
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="px-4 py-2 bg-white hover:bg-[#D4A373]/10 text-[#D4A373] border border-[#D4A373]/30 rounded-xs text-xs font-serif cursor-pointer shrink-0 transition-colors flex items-center gap-1.5 shadow-2xs">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>选择本地图片</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
                <span className="text-[11px] text-[#4A4541]/40">或直接输入网络图片地址：</span>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 w-full p-2 text-xs bg-white border border-[#4A4541]/15 rounded-xs"
                />
              </div>

              {photoUrl && (
                <div className="mt-2 rounded-xs overflow-hidden max-h-48 border border-black/10">
                  <img src={photoUrl} alt="Preview" className="w-full object-cover max-h-48" />
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-[#4A4541]/50">底色：</span>
                {BG_THEMES.map((t) => (
                  <button
                    type="button"
                    key={t.key}
                    onClick={() => setSelectedTheme(t.key)}
                    className={`w-5 h-5 rounded-full ${t.bg} transition-transform ${
                      selectedTheme === t.key ? 'scale-125 ring-2 ring-[#4A4541]/30 shadow-xs' : 'opacity-60 hover:opacity-100'
                    }`}
                    title={t.name}
                  />
                ))}
              </div>

              {!showPhotoInput && (
                <button
                  type="button"
                  onClick={() => setShowPhotoInput(true)}
                  className="text-xs font-serif text-[#D4A373] hover:text-[#4A4541] flex items-center gap-1 bg-[#FAF7F2] px-3 py-1 rounded-xs border border-[#D4A373]/20 cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>上传剪影照片</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!content.trim()}
              className="w-full sm:w-auto px-6 py-2 bg-[#4A4541] hover:bg-[#4A4541]/90 disabled:opacity-30 text-white rounded-xs font-serif text-xs tracking-wider transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>悄悄贴上回声墙</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </form>
      </div>

      {/* 回声陈列瀑布流 / 堆叠纸片 */}
      <div className="space-y-6">
        <h3 className="font-serif italic text-base text-[#4A4541]/70 tracking-wide">
          正在墙上共鸣的回音 ({posts.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {posts.map((post, index) => {
            const rot = index % 3 === 0 ? '-rotate-1' : index % 3 === 1 ? 'rotate-1' : '-rotate-0.5';
            const themeStyle = getThemeClass(post.bgTheme);
            const isLiked = likedMap[post.id];
            const commentsCount = (post.comments || []).length;
            const isCommentOpen = openCommentsPostId === post.id;

            return (
              <div
                key={post.id}
                className={`paper-card p-6 rounded-xs flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${rot} ${themeStyle}`}
              >
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono opacity-75 mb-3">
                    <span>✦ {post.moodTag}</span>
                    <span>{post.timestamp}</span>
                  </div>

                  {/* 如果有照片则展示照片 */}
                  {post.imageUrl && (
                    <div className="mb-4 rounded-xs overflow-hidden shadow-sm border border-white/20 bg-black/5">
                      <img
                        src={post.imageUrl}
                        alt="Echo shadow"
                        className="w-full h-48 object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  )}

                  <p className="text-xs md:text-sm font-light leading-relaxed whitespace-pre-wrap min-h-[44px] select-text">
                    “{post.content}”
                  </p>
                </div>

                {/* 温柔轻反馈与评论交互区 */}
                <div className="mt-6 pt-4 border-t border-white/20 space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    {/* 点赞按钮 */}
                    <button
                      type="button"
                      onClick={() => handleToggleLike(post.id)}
                      className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-white text-[#E5B7B7] shadow-xs scale-105 font-bold'
                          : 'bg-black/15 hover:bg-black/25 text-white'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-[#E5B7B7]' : ''}`} />
                      <span>点赞 ({post.reactions.hug})</span>
                    </button>

                    {/* 评论展开按钮 */}
                    <button
                      type="button"
                      onClick={() => setOpenCommentsPostId(isCommentOpen ? null : post.id)}
                      className="px-3 py-1 rounded-full bg-black/15 hover:bg-black/25 text-white text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>评论 ({commentsCount})</span>
                    </button>
                  </div>

                  {/* 展开的评论区 */}
                  {isCommentOpen && (
                    <div className="pt-3 border-t border-white/15 space-y-3 animate-fade-in bg-black/10 p-3 rounded-xs text-white/90">
                      <div className="text-[11px] font-mono opacity-80 mb-1">温柔回音列：</div>
                      
                      {commentsCount === 0 ? (
                        <p className="text-[11px] italic opacity-60 font-light">暂无评论，留下第一句轻声关怀吧。</p>
                      ) : (
                        <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                          {post.comments.map((c) => (
                            <div key={c.id} className="text-xs bg-black/15 p-2 rounded-2xs font-light">
                              <span className="font-medium font-serif opacity-90">{c.author}：</span>
                              <span>{c.text}</span>
                              <span className="text-[9px] font-mono opacity-50 block mt-0.5">{c.timestamp}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 发表评论框 */}
                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          value={commentInputMap[post.id] || ''}
                          onChange={(e) => setCommentInputMap({ ...commentInputMap, [post.id]: e.target.value })}
                          placeholder="写下温暖的评论安慰Ta..."
                          className="flex-1 px-2.5 py-1.5 text-xs bg-white/15 placeholder-white/50 border border-white/20 rounded-xs text-white focus:outline-hidden focus:bg-white/25"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddComment(post.id)}
                          className="px-3 py-1.5 bg-white text-[#4A4541] rounded-xs text-xs font-serif font-medium cursor-pointer hover:bg-white/90 shrink-0"
                        >
                          回音
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
