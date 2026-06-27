// Gentle Relaxing Soothing Light Music Player

class SoundPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private fadeTimer: number | null = null;

  // 舒缓节奏轻音乐源（温和钢琴与治愈纯音乐）
  private musicList = [
    'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3', // Gentle Relaxing Piano
    'https://upload.wikimedia.org/wikipedia/commons/2/21/Erik_Satie_-_Gymnop%C3%A9die_No._1.ogg' // Gymnopédie No. 1 by Erik Satie
  ];

  public start() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (!this.audio) {
      this.audio = new Audio(this.musicList[0]);
      this.audio.loop = true;
      this.audio.volume = 0; // 初始为0方便淡入

      // 备用播放链接自动切换
      this.audio.addEventListener('error', () => {
        if (this.audio && this.audio.src.indexOf('wikimedia') === -1) {
          this.audio.src = this.musicList[1];
          if (this.isPlaying) {
            this.audio.play().catch(e => console.warn('Audio play fallback blocked', e));
          }
        }
      });
    }

    this.audio.play().then(() => {
      this.fadeIn();
    }).catch(e => {
      console.warn('播放舒缓轻音乐被浏览器限制（可能需用户手动点击交互）:', e);
    });
  }

  private fadeIn() {
    if (this.fadeTimer) clearInterval(this.fadeTimer);
    if (!this.audio) return;

    this.audio.volume = 0;
    this.fadeTimer = window.setInterval(() => {
      if (!this.audio || !this.isPlaying) {
        if (this.fadeTimer) clearInterval(this.fadeTimer);
        return;
      }
      if (this.audio.volume < 0.35) {
        this.audio.volume = Math.min(0.35, this.audio.volume + 0.03);
      } else {
        if (this.fadeTimer) clearInterval(this.fadeTimer);
      }
    }, 150);
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.fadeTimer) clearInterval(this.fadeTimer);

    if (this.audio) {
      // 柔和淡出
      const audioRef = this.audio;
      const fadeOutTimer = window.setInterval(() => {
        if (audioRef.volume > 0.05) {
          audioRef.volume = Math.max(0, audioRef.volume - 0.05);
        } else {
          audioRef.pause();
          clearInterval(fadeOutTimer);
        }
      }, 100);
    }
  }
}

export const soundPlayer = new SoundPlayer();

