import { RoomMeta, MicroAction, StarlightCard, Wish, DiaryEntry, EchoPost } from '../types';

export const ROOMS: RoomMeta[] = [
  {
    id: 'diary',
    title: '日记房',
    subtitle: 'Diary Room',
    desc: '留下一个瞬间，也算在照顾自己。不需完整叙述，一张照片一杯水也是确切的存在。',
    badge: '记录瞬间',
    rotationClass: '-rotate-1',
    tapeColor: 'bg-[#E5B7B7]/40',
    accentBg: 'bg-[#FFFDF9]'
  },
  {
    id: 'action',
    title: '行动角',
    subtitle: 'Action Corner',
    desc: '低能量友好的微行动。看窗外一分钟、喝一口水……重点不是完成多少，而是轻轻起步。',
    badge: '零负重行动',
    rotationClass: 'rotate-2',
    tapeColor: 'bg-[#9BAE96]/50',
    accentBg: 'bg-[#FCF9F2]'
  },
  {
    id: 'wish',
    title: '愿望柜',
    subtitle: 'Wish Cabinet',
    desc: '慢慢实现，也是一种实现。通过微小行动积累星尘，绘本式可视化地靠近心愿。',
    badge: '绘本式心愿',
    rotationClass: '-rotate-2',
    tapeColor: 'bg-[#D4A373]/40',
    accentBg: 'bg-[#FAF7F2]'
  },
  {
    id: 'sofa',
    title: '陪伴沙发',
    subtitle: 'Cozy Sofa',
    desc: '小猫“慢吞吞”在打瞌睡。累了、纠结了随时来坐坐，先被接住情绪，再待在当下。',
    badge: '小猫树洞',
    rotationClass: 'rotate-1',
    tapeColor: 'bg-[#B8C5D6]/60',
    accentBg: 'bg-[#FAF7F2]'
  },
  {
    id: 'echo',
    title: '回声墙',
    subtitle: 'Echo Wall',
    desc: '匿名分享今天的状态，收到远方轻柔如风的回应。在温柔轻盈的空间里被看见。',
    badge: '温柔被看见',
    rotationClass: '-rotate-1',
    tapeColor: 'bg-[#E5B7B7]/50',
    accentBg: 'bg-[#FDFBFF]'
  },
  {
    id: 'card',
    title: '星光卡',
    subtitle: 'Starlight Cards',
    desc: '写给疲惫大人的纸条。随手抽一张，允许自己慢下来，把紧绷的肩膀慢慢放下。',
    badge: '舒缓灵感',
    rotationClass: 'rotate-2',
    tapeColor: 'bg-[#9BAE96]/40',
    accentBg: 'bg-[#F9FBF8]'
  }
];

export const INITIAL_MICRO_ACTIONS: MicroAction[] = [
  {
    id: 'act-1',
    title: '看窗外一分钟',
    desc: '让眼睛离开屏幕，发呆看着外面的云朵、树梢或路灯，什么都不用构思',
    energyLevel: '极低能量',
    iconName: 'CloudSun',
    rewardStardust: 5
  },
  {
    id: 'act-2',
    title: '喝一口温润的水',
    desc: '感受水流缓慢经过喉咙，告诉自己：我的身体正在被认真照顾',
    energyLevel: '极低能量',
    iconName: 'Coffee',
    rewardStardust: 5
  },
  {
    id: 'act-3',
    title: '站起来伸一个懒腰',
    desc: '像树枝向天空舒展一样，把手臂举高5秒钟，听到肩颈轻微放松的声音',
    energyLevel: '身体微动',
    iconName: 'Activity',
    rewardStardust: 10
  },
  {
    id: 'act-4',
    title: '深呼吸三次',
    desc: '吸气4秒，停顿2秒，缓慢呼气6秒。把肩膀和眉头轻柔地松开',
    energyLevel: '轻柔呼吸',
    iconName: 'Wind',
    rewardStardust: 8
  },
  {
    id: 'act-5',
    title: '摆正桌上的一个杯子',
    desc: '不需要收拾整间屋子，只把手边的一本书或一只笔摆好，就是一片秩序',
    energyLevel: '身体微动',
    iconName: 'Sparkles',
    rewardStardust: 12
  },
  {
    id: 'act-6',
    title: '对自己说一声“辛苦了”',
    desc: '闭上眼，对今天努力扛着生活的自己说：你已经做得非常好了',
    energyLevel: '心灵留白',
    iconName: 'HeartHandshake',
    rewardStardust: 15
  }
];

export const INITIAL_STARLIGHT_CARDS: StarlightCard[] = [
  {
    id: 'sc-1',
    quote: '你不需要一直处于“巅峰状态”。发呆、缓慢、甚至停滞一段时间，也是生命周期里必需的冬天。',
    author: '慢吞吞的观察日记',
    theme: '允许缓慢',
    unlocked: true
  },
  {
    id: 'sc-2',
    quote: '种子在泥土里发芽的前几天，外面什么都看不到。你现在看似没有结果的坚持，其实正在地下扎根。',
    author: '绘本《慢树》',
    theme: '静默生长',
    unlocked: true
  },
  {
    id: 'sc-3',
    quote: '累了就睡一觉。天塌下来，小猫咪会替你用毛茸茸的耳朵顶一顶，至少能顶到明天早上。',
    author: '陪伴沙发小猫语录',
    theme: '安心休息',
    unlocked: true
  },
  {
    id: 'sc-4',
    quote: '并不是要把整座屋子照亮才算拥有光。黑夜里点亮一盏小灯，它照亮的那一平方米，就是你的安全区。',
    author: '《星夜散步》',
    theme: '确定与陪伴',
    unlocked: true
  },
  {
    id: 'sc-5',
    quote: '当完成一件大事太沉重时，试着去完成一个微不足道的动作。喝完一杯水，也是今天对自己的承诺。',
    author: '行动角回音',
    theme: '零负担起步',
    unlocked: true
  },
  {
    id: 'sc-6',
    quote: '允许自己偶尔做一个“运行缓慢的程序”。重新加载需要时间，请对这副辛苦的身体温柔一点。',
    author: 'wish slowly 寄语',
    theme: '自我关怀',
    unlocked: false
  }
];

export const INITIAL_WISHES: Wish[] = [
  {
    id: 'wish-1',
    title: '周末去公园晒半小时太阳',
    storyNote: '关掉工作手机，坐在长椅上听风吹过梧桐树叶的声音，什么目标都不想。',
    targetStardust: 100,
    currentStardust: 65,
    illustrationType: 'tree',
    createdAt: Date.now() - 86400000 * 4
  },
  {
    id: 'wish-2',
    title: '买一束自己喜欢的洋甘菊',
    storyNote: '插在透明玻璃瓶里，每天早晨看它喝水舒展的样子。',
    targetStardust: 150,
    currentStardust: 30,
    illustrationType: 'cozy_lamp',
    createdAt: Date.now() - 86400000 * 8
  }
];

export const INITIAL_DIARIES: DiaryEntry[] = [
  {
    id: 'd-1',
    dateStr: '今天 下午',
    momentNote: '下午阳光正好照在书桌一角，泡了一杯温润的陈皮茶。拍下了水汽蒸腾的瞬间，感觉疲惫稍微轻了一点。',
    presetTag: '☀️ 窗外的光',
    moodLabel: '平静舒展',
    createdAt: Date.now() - 3600000 * 3
  }
];

export const INITIAL_ECHOES: EchoPost[] = [
  {
    id: 'echo-101',
    content: '加班到十点半，走在路上看着路灯，突然觉得能大口呼吸秋夜的风也是一种自由。今天辛苦了，我自己。',
    moodTag: '疲惫但平静',
    timestamp: '15分钟前',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    reactions: { hug: 28, star: 19, moon: 32, leaf: 14 },
    comments: [
      { id: 'c-1', author: '晚风过客', text: '抱抱你，晚风真的很治愈，早点回家泡个脚~', timestamp: '10分钟前' },
      { id: 'c-2', author: '匿名路人', text: '辛苦啦！今晚祝你有一个纯甜无梦的好觉。', timestamp: '5分钟前' }
    ],
    bgTheme: 'sky'
  },
  {
    id: 'echo-102',
    content: '今天本来想去健身房，最后只在窗边拉开窗帘站了3分钟。本有些自责，看到行动角说“看窗外一分钟也是行动”，瞬间眼眶热了。',
    moodTag: '被轻轻接住',
    timestamp: '1小时前',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    reactions: { hug: 45, star: 38, moon: 12, leaf: 26 },
    comments: [
      { id: 'c-3', author: '慢吞吞的猫咪', text: '身体已经在谢谢你让它晒了3分钟阳光了！', timestamp: '40分钟前' }
    ],
    bgTheme: 'sage'
  },
  {
    id: 'echo-103',
    content: '把愿望设成了“每天早睡且好好吃早餐”。以前总觉得宏大的才是理想，现在觉得照顾好这副身体，就是最了不起的英雄主义。',
    moodTag: '温柔坚定',
    timestamp: '3小时前',
    imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
    reactions: { hug: 52, star: 61, moon: 24, leaf: 30 },
    comments: [
      { id: 'c-4', author: '向日葵小队', text: '完全认同！吃好睡好已经是现代生活的大师级造诣了。', timestamp: '2小时前' },
      { id: 'c-5', author: '星尘采集员', text: '早晨的热豆浆会替我们给身体一个暖暖的拥抱。', timestamp: '1小时前' }
    ],
    bgTheme: 'amber'
  },
  {
    id: 'echo-104',
    content: '不知道发给谁，想在这里轻声说一句：如果你今天也很难过，允许自己难过一会儿吧。小猫咪和房间都在陪着你。',
    moodTag: '深夜树洞',
    timestamp: '5小时前',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    reactions: { hug: 88, star: 46, moon: 55, leaf: 21 },
    comments: [
      { id: 'c-6', author: '远方的抱抱', text: '谢谢你温柔的话语，今天正低落的我被你接住了。', timestamp: '3小时前' }
    ],
    bgTheme: 'rose'
  }
];
