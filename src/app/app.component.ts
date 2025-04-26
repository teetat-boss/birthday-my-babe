import { Component, ElementRef, ViewChild } from '@angular/core';
import { NzImageModule } from 'ng-zorro-antd/image';
import { ImageSliderComponent } from "./image-slider/image-slider.component";
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { SnowFlakeComponent } from './snow-flake/snow-flake.component';
import { MusicControlService } from './music-control.service';

interface SnowFlakeConfig {
  depth: number;
  left: number;
  speed: number;
}

@Component({
  selector: 'my-app',
  imports: [NzImageModule, ImageSliderComponent, CommonModule, MusicPlayerComponent, SnowFlakeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  snowFlakes: SnowFlakeConfig[] = [];
  title = 'birthday-my-babe';

  constructor(
    private musicControlService: MusicControlService
  ) {
    for (let i = 0; i < 150; i++) {
      this.snowFlakes.push({
        depth: this.randRange(1, 5),
        left: this.randRange(0, 100),
        speed: this.randRange(1, 5),
      });
    }
  }

  private randRange(min: number, max: number): number {
    return min + Math.round(Math.random() * (max - min));
  }
  isOpened = false;
  isExpanding = false;
  isVideoOpen = false;
  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef<HTMLVideoElement>;

  openGift() {
    this.musicControlService.pauseMusic();
    this.isExpanding = true;

    setTimeout(() => {
      this.isVideoOpen = true;
      this.isOpened = true;
      setTimeout(() => this.playFullScreen(), 100);
  }, 1000); // รอ confetti แล้วค่อยเปิดวิดีโอ

}

closeVideo() {
  if (this.videoPlayerRef) {
    this.videoPlayerRef.nativeElement.pause();
  }
  this.isVideoOpen = false;
}


playFullScreen() {
  const video = this.videoPlayerRef.nativeElement;
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if ((video as any).webkitRequestFullscreen) {
    (video as any).webkitRequestFullscreen();
  } else if ((video as any).mozRequestFullScreen) {
    (video as any).mozRequestFullScreen();
  } else if ((video as any).msRequestFullscreen) {
    (video as any).msRequestFullscreen();
  }
}
}
