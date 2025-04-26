import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'image-slider',
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent {
  currentIndex = 0;
  touchStartX = 0;
  touchEndX = 0;
  intervalId: any;
  isTransitioning = false; // 🔥 NEW: ป้องกันกดตอนกำลังเปลี่ยน

  images = [
    { no: 1, url: './img/1.jpg', name: 'Image 1' },
    { no: 2, url: './img/2.jpg', name: 'Image 2' },
    { no: 3, url: './img/3.jpg', name: 'Image 3' },
    { no: 4, url: './img/4.jpg', name: 'Image 4' },
    { no: 6, url: './img/6.jpg', name: 'Image 6' },
    { no: 7, url: './img/7.jpg', name: 'Image 7' },
    { no: 8, url: './img/8.jpg', name: 'Image 8' },
    { no: 9, url: './img/9.jpg', name: 'Image 9' },
    { no: 10, url: './img/10.jpg', name: 'Image 10' },
    { no: 11, url: './img/11.jpg', name: 'Image 11' },
    
  ];

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleGesture();
  }

  handleGesture() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    if (swipeDistance > 50) {
      this.prevImage();
    } else if (swipeDistance < -50) {
      this.nextImage();
    }
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goToImage(index: number) {
    this.currentIndex = index;
  }
}
