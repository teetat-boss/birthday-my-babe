import { Component, ElementRef, ViewChild } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MusicControlService } from '../music-control.service';

@Component({
  selector: 'music-player',
  imports: [CommonModule],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss'
})
export class MusicPlayerComponent {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private musicControlService: MusicControlService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  isBrowser: boolean;

  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  songs = [
    { no: 1, title: 'gnsdily', artist: 'TUCKTIE', url: './music/song0.mp3' },
    { no: 2, title: 'เพลงรัก', artist: 'Three Man Down', url: './music/song1.mp3' },
    { no: 3, title: 'จีบ', artist: 'QLER', url: './music/song2.mp3' },
    { no: 4, title: 'ธรรมดาแสนพิเศษ  Extraordinary', artist: 'ANATOMY RABBIT', url: './music/song3.mp3' },
    { no: 5, title: 'ดาวหางฮัลเลย์', artist: 'fellow fellow', url: './music/song4.mp3' },
  ];

  currentSong = this.songs[0];
  isPlaying = false;
  currentTime = '00:00';
  duration = '00:00';
  progress = 0;

  ngAfterViewInit() {
    const audio = this.audioPlayerRef.nativeElement;

    audio.addEventListener('loadedmetadata', () => {
      this.duration = this.formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      this.currentTime = this.formatTime(audio.currentTime);
      this.progress = (audio.currentTime / audio.duration) * 100 || 0;
    });

    audio.addEventListener('ended', () => {
      if (!this.isLastSong()) {
        this.nextSong();
      } else {
        this.isPlaying = false;
        audio.currentTime = 0; // กลับไปต้นเพลงสุดท้าย ถ้าอยากได้
      }
    });

    this.musicControlService.musicPaused$.subscribe(paused => {
      if (!this.audioPlayerRef?.nativeElement) {
        console.warn('audio player not ready yet.');
        return;
      }
      this.togglePlay();
    });

    this.reloadAudio();
  }

  togglePlay() {
    const audio = this.audioPlayerRef.nativeElement;
    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }

  seekAudio(event: any) {
    const audio = this.audioPlayerRef.nativeElement;
    const value = event.target.value;
    audio.currentTime = (value / 100) * audio.duration;
  }

  isSeeking = false; // เพิ่มตัวแปรใหม่ ว่าเรากำลังลากอยู่มั้ย

  onSeekStart() {
    this.isSeeking = true;
  }

  onSeeking(event: any) {
    if (this.isSeeking) {
      const value = event.target.value;
      const audio = this.audioPlayerRef.nativeElement;
      const currentTime = (value / 100) * audio.duration;
      this.currentTime = this.formatTime(currentTime);
      this.progress = value;
    }
  }

  onSeekEnd(event: any) {
    this.isSeeking = false;
    this.seekAudio(event); // ตอนปล่อยค่อย set currentTime จริง
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }

  prevSong() {
    const index = this.songs.findIndex(song => song.no === this.currentSong.no);
    if (index > 0) {
      this.currentSong = this.songs[index - 1];
      this.reloadAudio();
    }
  }

  nextSong() {
    const index = this.songs.findIndex(song => song.no === this.currentSong.no);
    if (index < this.songs.length - 1) {
      this.currentSong = this.songs[index + 1];
      this.reloadAudio();
    }
  }

  reloadAudio() {
    const audio = this.audioPlayerRef.nativeElement;
    audio.pause(); // หยุดเพลงก่อน
    this.isPlaying = false;

    // ฟัง event loadeddata ก่อน
    audio.onloadeddata = () => {
      if (!this.isPlaying) {
        audio.play();
        this.isPlaying = true;
      }
    };
  }

  isFirstSong(): boolean {
    return this.songs.findIndex(song => song.no === this.currentSong.no) === 0;
  }

  isLastSong(): boolean {
    return this.songs.findIndex(song => song.no === this.currentSong.no) === this.songs.length - 1;
  }
}
