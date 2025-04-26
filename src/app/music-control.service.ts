import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicControlService {

  constructor() { }

  private musicPausedSource = new BehaviorSubject<boolean>(false);
  musicPaused$ = this.musicPausedSource.asObservable();

  pauseMusic() {
    this.musicPausedSource.next(true);
  }

  playMusic() {
    this.musicPausedSource.next(false);
  }
}
