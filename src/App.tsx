import React, { useState, useEffect } from 'react';
import { RoomId, UserState, Wish, DiaryEntry, MicroAction, StarlightCard } from './types';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { RoomMap } from './components/RoomMap';
import { DiaryRoom } from './components/rooms/DiaryRoom';
import { ActionCorner } from './components/rooms/ActionCorner';
import { WishCabinet } from './components/rooms/WishCabinet';
import { CozySofa } from './components/rooms/CozySofa';
import { EchoWall } from './components/rooms/EchoWall';
import { StarlightCards } from './components/rooms/StarlightCards';

import {
  getStoredUserState,
  saveStoredUserState,
  getStoredWishes,
  saveStoredWishes,
  getStoredDiaries,
  saveStoredDiaries,
  getStoredActions,
  saveStoredActions,
} from './lib/storage';
import { INITIAL_STARLIGHT_CARDS } from './data/initialData';
import { soundPlayer } from './lib/audio';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('wish-slowly-authenticated') === 'true'
  );
  const [currentRoomId, setCurrentRoomId] = useState<RoomId | null>(null);

  // 持久化状态集
  const [userState, setUserState] = useState<UserState>(getStoredUserState);
  const [wishes, setWishes] = useState<Wish[]>(getStoredWishes);
  const [diaries, setDiaries] = useState<DiaryEntry[]>(getStoredDiaries);
  const [actions, setActions] = useState<MicroAction[]>(getStoredActions);
  const [cards, setCards] = useState<StarlightCard[]>(INITIAL_STARLIGHT_CARDS);

  // 状态变更同步保存到本地与同步音频
  useEffect(() => {
    saveStoredUserState(userState);
    if (userState.soundEnabled) {
      soundPlayer.start();
    } else {
      soundPlayer.stop();
    }
  }, [userState]);

  useEffect(() => {
    saveStoredWishes(wishes);
  }, [wishes]);

  useEffect(() => {
    saveStoredDiaries(diaries);
  }, [diaries]);

  useEffect(() => {
    saveStoredActions(actions);
  }, [actions]);

  // 页面回顶与平滑过渡
  const handleSelectRoom = (id: RoomId) => {
    setCurrentRoomId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMap = () => {
    setCurrentRoomId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    setUserState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleLogout = () => {
    localStorage.removeItem('wish-slowly-authenticated');
    setIsAuthenticated(false);
    setCurrentRoomId(null);
    soundPlayer.stop();
  };

  // 业务动作：新增瞬间日记
  const handleAddDiary = (entry: DiaryEntry) => {
    setDiaries((prev) => [entry, ...prev]);
    setUserState((prev) => ({
      ...prev,
      stardustCount: prev.stardustCount + 10,
      diariesLoggedTotal: prev.diariesLoggedTotal + 1,
    }));
  };

  // 业务动作：完成微行动
  const handleCompleteAction = (actId: string, reward: number) => {
    setActions((prev) =>
      prev.map((a) => (a.id === actId ? { ...a, completedToday: true } : a))
    );
    setUserState((prev) => ({
      ...prev,
      stardustCount: prev.stardustCount + reward,
      actionsCompletedTotal: prev.actionsCompletedTotal + 1,
    }));
  };

  // 业务动作：新增自定义微行动
  const handleAddAction = (act: MicroAction) => {
    setActions((prev) => [act, ...prev]);
  };

  // 业务动作：许愿
  const handleAddWish = (wish: Wish) => {
    setWishes((prev) => [wish, ...prev]);
  };

  // 业务动作：倾注星尘喂养愿望
  const handleFeedWish = (wishId: string, amount: number) => {
    if (userState.stardustCount < amount) return;

    setUserState((prev) => ({
      ...prev,
      stardustCount: prev.stardustCount - amount,
    }));

    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === wishId) {
          const updatedCurr = w.currentStardust + amount;
          const justFinished = updatedCurr >= w.targetStardust && w.currentStardust < w.targetStardust;
          if (justFinished) {
            setUserState((u) => ({ ...u, wishesCompletedTotal: u.wishesCompletedTotal + 1 }));
          }
          return { ...w, currentStardust: updatedCurr };
        }
        return w;
      })
    );
  };

  // 业务动作：解锁星光卡
  const handleUnlockCard = (cardId: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, unlocked: true } : c))
    );
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FDFBF7] text-[#4A4541]">
      <div>
        {/* 通用页头 */}
        <Header
          currentRoomId={currentRoomId}
          onBackToMap={handleBackToMap}
          stardustCount={userState.stardustCount}
          soundEnabled={userState.soundEnabled}
          onToggleSound={handleToggleSound}
          onLogout={handleLogout}
        />

        {/* 房间地图主视图 vs 房间内部单页视图 */}
        <div className="py-6">
          {currentRoomId === null && <RoomMap onSelectRoom={handleSelectRoom} />}

          {currentRoomId === 'diary' && (
            <DiaryRoom
              diaries={diaries}
              onAddDiary={handleAddDiary}
              onBack={handleBackToMap}
            />
          )}

          {currentRoomId === 'action' && (
            <ActionCorner
              actions={actions}
              onCompleteAction={handleCompleteAction}
              onAddAction={handleAddAction}
              onBack={handleBackToMap}
            />
          )}

          {currentRoomId === 'wish' && (
            <WishCabinet
              wishes={wishes}
              userStardust={userState.stardustCount}
              onAddWish={handleAddWish}
              onFeedWish={handleFeedWish}
              onBack={handleBackToMap}
            />
          )}

          {currentRoomId === 'sofa' && <CozySofa onBack={handleBackToMap} />}

          {currentRoomId === 'echo' && <EchoWall onBack={handleBackToMap} />}

          {currentRoomId === 'card' && (
            <StarlightCards
              cards={cards}
              onUnlockCard={handleUnlockCard}
              onBack={handleBackToMap}
            />
          )}
        </div>
      </div>

      {/* 底部绘本落款 */}
      <footer className="pt-8 pb-10 px-6 md:px-12 max-w-6xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#4A4541]/40 border-t border-[#4A4541]/8 select-none">
        <div className="flex items-center gap-2">
          <span>EST. 2026</span>
          <span>•</span>
          <span>WISH SLOWLY COMPANION</span>
        </div>

        <div className="flex items-center gap-6">
          <span>今日微行动: {userState.actionsCompletedTotal}</span>
          <span>瞬间剪影: {userState.diariesLoggedTotal}</span>
        </div>
      </footer>
    </div>
  );
}
