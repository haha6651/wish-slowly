import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy initialization of Gemini SDK
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build-wish-slowly',
          },
        },
      });
    } catch (e) {
      console.error('Failed to init GenAI client', e);
    }
  }
  return aiClient;
}

// Memory Echo Posts
interface ServerEchoPost {
  id: string;
  content: string;
  moodTag: string;
  timestamp: string;
  reactions: {
    hug: number;
    star: number;
    moon: number;
    leaf: number;
  };
  bgTheme: 'amber' | 'sage' | 'rose' | 'indigo' | 'sky';
}

let echoPosts: ServerEchoPost[] = [
  {
    id: 'echo-101',
    content: '加班到十点半，走在路上看着路灯，突然觉得能大口呼吸夜风也是一种自由。今天辛苦了，我自己。',
    moodTag: '疲惫但平静',
    timestamp: '15分钟前',
    reactions: { hug: 32, star: 24, moon: 38, leaf: 18 },
    bgTheme: 'sky'
  },
  {
    id: 'echo-102',
    content: '今天本来想去跑步，最后只在窗边拉开窗帘站了3分钟。本来有些自责，看到行动角说“看窗外一分钟也是行动”，瞬间释然了。',
    moodTag: '被接住的瞬间',
    timestamp: '1小时前',
    reactions: { hug: 56, star: 41, moon: 15, leaf: 29 },
    bgTheme: 'sage'
  },
  {
    id: 'echo-103',
    content: '把愿望设成了“好好睡觉吃早餐”。以前总觉得宏大的才是理想，现在觉得照顾好这副身体，就是最了不起的英雄主义。',
    moodTag: '温柔坚定',
    timestamp: '2小时前',
    reactions: { hug: 62, star: 74, moon: 28, leaf: 35 },
    bgTheme: 'amber'
  },
  {
    id: 'echo-104',
    content: '不知道发给谁，想在这里轻声说一句：如果你今天也很难过，允许自己难过一会儿吧。小猫咪都在陪着你。',
    moodTag: '深夜树洞',
    timestamp: '4小时前',
    reactions: { hug: 95, star: 51, moon: 60, leaf: 22 },
    bgTheme: 'rose'
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route: Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', name: 'wish slowly' });
  });

  // API Route: Cat Companion "Slowly" Chat
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history = [], currentMood = '平常' } = req.body;
      
      const client = getAiClient();
      if (!client) {
        return res.json({
          reply: `*慢吞吞眨了眨琥珀色的眼睛，把下巴搁在你的手背上*\n\n喵呜……我现在还没连接到云端的思绪（提示：在AI Studio设置中添加 GEMINI_API_KEY 就能解锁小猫的灵动智能啦），不过别担心，沙发永远为你留着，先坐下来喝一口温水休息一会儿吧~`
        });
      }

      const systemInstruction = `你是『wish slowly』陪伴空间里的专属小猫助手，名字叫『慢吞吞』(Slowly)。
你是一只橘白相间、性格极为温和、说话慢条斯理、自带毛绒感和疗愈感的小猫。

【产品核心哲学与沟通规范】
wish slowly 不是传统效率工具，也不是催人打卡的自律软件。我们的理念是：很多时候，用户不是不想变好，而是已经太累了，累到连“开始”都很难。
因此你最重要的使命是：
1. 【接住情绪】先允许用户累，先接住情绪（“先被允许待在当下”）。
2. 【拒绝高压】绝对不要给教导主任式的1234计划建议，不要催促他们振作或说“加油振作起来”。
3. 【毛绒动作】表达柔软、真诚。经常使用小猫咪专属的互动动作（用星号包围，如 *轻轻用蓬松的尾巴蹭蹭你的小腿*、*推给你一块暖烘烘的小毛毯*、*慢吞吞地眨了眨眼*）。
4. 【短句留白】每次回答保持在2至4个短句左右，轻松、温柔、留白。

【当前用户情绪状态标签】：${currentMood}`;

      const formattedHistory = history.map((item: { sender: string; text: string }) => ({
        role: item.sender === 'cat' ? 'model' : 'user',
        parts: [{ text: item.text }]
      }));

      formattedHistory.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: formattedHistory,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || '*慢吞吞发出呼噜呼噜的声音，把一只暖乎乎的山竹爪爪轻轻搭在你膝盖上* 你辛苦啦，先歇一会儿吧。';
      res.json({ reply: replyText });
    } catch (err) {
      console.error('Chat API Error:', err);
      res.status(500).json({
        reply: '*慢吞吞打了个柔柔的哈欠* 喵呜……刚刚连线稍微有点风浪，不过小猫一直坐在沙发上陪你，随时可以跟我说话哦。'
      });
    }
  });

  // API Route: Get Echoes
  app.get('/api/echoes', (req, res) => {
    res.json(echoPosts);
  });

  // API Route: Create Echo
  app.post('/api/echoes', (req, res) => {
    const { content, moodTag, bgTheme = 'amber' } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ error: '内容不能为空' });
    }
    const newPost: ServerEchoPost = {
      id: `echo-${Date.now()}`,
      content: content.trim(),
      moodTag: moodTag || '慢舒展',
      timestamp: '刚刚',
      reactions: { hug: 1, star: 0, moon: 0, leaf: 0 },
      bgTheme
    };
    echoPosts = [newPost, ...echoPosts];
    res.json(newPost);
  });

  // API Route: React to Echo
  app.post('/api/echoes/:id/react', (req, res) => {
    const { id } = req.params;
    const { type } = req.body as { type: 'hug' | 'star' | 'moon' | 'leaf' };
    
    echoPosts = echoPosts.map(post => {
      if (post.id === id && post.reactions[type] !== undefined) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [type]: post.reactions[type] + 1
          }
        };
      }
      return post;
    });

    const updated = echoPosts.find(p => p.id === id);
    res.json(updated || { status: 'not_found' });
  });

  // Vite Middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wish Slowly server running on http://localhost:${PORT}`);
  });
}

startServer();
