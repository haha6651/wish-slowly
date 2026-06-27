export type RoomId = 'diary' | 'action' | 'wish' | 'sofa' | 'echo' | 'card';

export interface RoomMeta {
  id: RoomId;
  title: string;
  subtitle: string;
  desc: string;
  badge: string;
  rotationClass: string;
  tapeColor: string;
  accentBg: string;
}

export interface DiaryEntry {
  id: string;
  dateStr: string;
  momentNote: string;
  imageUrl?: string;
  presetTag?: string;
  moodLabel: string;
  createdAt: number;
}

export interface MicroAction {
  id: string;
  title: string;
  desc: string;
  energyLevel: '极低能量' | '轻柔呼吸' | '身体微动' | '心灵留白';
  iconName: string;
  rewardStardust: number;
  completedToday?: boolean;
  targetMinutes?: number;
  isCustom?: boolean;
}

export interface Wish {
  id: string;
  title: string;
  storyNote: string;
  targetStardust: number;
  currentStardust: number;
  illustrationType: 'tree' | 'hot_air_balloon' | 'starry_island' | 'cozy_lamp';
  createdAt: number;
}

export interface StarlightCard {
  id: string;
  quote: string;
  author: string;
  theme: string;
  unlocked?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'cat';
  text: string;
  timestamp: string;
}

export interface EchoComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface EchoPost {
  id: string;
  content: string;
  moodTag: string;
  timestamp: string;
  imageUrl?: string;
  reactions: {
    hug: number;
    star: number;
    moon: number;
    leaf: number;
  };
  comments: EchoComment[];
  bgTheme: 'amber' | 'sage' | 'rose' | 'indigo' | 'sky';
}

export interface DivinationResult {
  type: 'tarot' | 'liuyao';
  name: string;
  symbol: string;
  keywords: string[];
  meaning: string;
  guidance: string;
}

export interface UserState {
  stardustCount: number; // 星尘（温柔积累的奖励点数）
  actionsCompletedTotal: number;
  wishesCompletedTotal: number;
  diariesLoggedTotal: number;
  soundEnabled: boolean;
  soundTheme: 'purr' | 'rain' | 'night' | 'silence';
}

