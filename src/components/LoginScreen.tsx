import React, { useState } from 'react';
import { LockKeyhole, LogIn, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const DEMO_EMAIL = 'demo@wish.slowly';
const DEMO_PASSWORD = '123456';

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.trim() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem('wish-slowly-authenticated', 'true');
      onLogin();
      return;
    }

    setError('演示账号或密码不正确');
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#4A4541] flex items-center justify-center px-5 py-10">
      <section className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#9BAE96]/15 border border-[#9BAE96]/30 rounded-full text-xs font-mono text-[#4A4541]/70">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            WISH SLOWLY COMPANION
          </div>

          <div className="space-y-4">
            <h1 className="font-serif italic text-5xl md:text-7xl leading-tight text-[#4A4541]">
              wish slowly
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-sm md:text-base leading-7 text-[#4A4541]/68 font-light">
              一个给疲惫大人的小房间。先轻轻登录，再把今天的情绪、愿望和微小行动放进来。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
            {['日记房', '愿望柜', '陪伴沙发'].map((item) => (
              <div
                key={item}
                className="bg-white/70 border border-[#4A4541]/8 px-3 py-4 rounded-xs text-xs font-serif text-[#4A4541]/70 shadow-xs"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="paper-card tape-top tape-top-sage bg-[#FFFDF9] rounded-xs p-6 md:p-8 space-y-6"
        >
          <div className="space-y-2">
            <div className="w-11 h-11 rounded-full bg-[#D4A373]/15 text-[#D4A373] flex items-center justify-center">
              <LockKeyhole className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif italic text-2xl text-[#4A4541]">进入房间</h2>
              <p className="text-xs text-[#4A4541]/55 mt-1">使用演示账号即可体验完整页面</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-mono text-[#4A4541]/60 block mb-1.5">账号</span>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError('');
                }}
                className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#4A4541]/12 rounded-xs text-sm text-[#4A4541] focus:outline-hidden focus:border-[#D4A373] transition-colors"
                autoComplete="email"
              />
            </label>

            <label className="block">
              <span className="text-xs font-mono text-[#4A4541]/60 block mb-1.5">密码</span>
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError('');
                }}
                className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#4A4541]/12 rounded-xs text-sm text-[#4A4541] focus:outline-hidden focus:border-[#D4A373] transition-colors"
                autoComplete="current-password"
              />
            </label>

            {error && (
              <p className="text-xs text-[#A35D55] bg-[#E5B7B7]/20 border border-[#E5B7B7]/40 px-3 py-2 rounded-xs">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#4A4541] hover:bg-[#4A4541]/92 text-[#FDFBF7] rounded-xs text-xs tracking-widest font-serif transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4 text-[#D4A373]" />
            登录演示空间
          </button>

          <div className="pt-3 border-t border-dashed border-[#4A4541]/12 text-[11px] font-mono text-[#4A4541]/45 space-y-1">
            <p>账号：{DEMO_EMAIL}</p>
            <p>密码：{DEMO_PASSWORD}</p>
          </div>
        </form>
      </section>
    </main>
  );
};
