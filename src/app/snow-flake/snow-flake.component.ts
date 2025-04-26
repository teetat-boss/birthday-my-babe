import { Component, Input } from '@angular/core';

@Component({
  selector: 'snow-flake',
  standalone: true,
  templateUrl: './snow-flake.component.html',
  styleUrl: './snow-flake.component.scss'
})
export class SnowFlakeComponent {
  @Input() depth = 1;
  @Input() speed = 1;

  flakeOpacity = 1;
  flakeSize = 1;
  horizontalDuration = 3;
  horizontalDelay = 0;
  verticalDuration = 5;
  verticalDelay = 0;

  ngOnChanges(): void {
    switch (this.speed) {
      case 1:
        this.verticalDuration = 5;
        this.horizontalDuration = 3;
        break;
      case 2:
        this.verticalDuration = 6;
        this.horizontalDuration = 3;
        break;
      case 3:
        this.verticalDuration = 8;
        this.horizontalDuration = 3.5;
        break;
      case 4:
        this.verticalDuration = 10;
        this.horizontalDuration = 4;
        break;
      case 5:
        this.verticalDuration = 15;
        this.horizontalDuration = 5;
        break;
    }

    this.verticalDelay = Math.random() * -this.verticalDuration;
    this.horizontalDelay = Math.random() * -this.horizontalDuration;

    switch (this.depth) {
      case 1:
        this.flakeSize = 2;
        this.flakeOpacity = 1;
        break;
      case 2:
        this.flakeSize = 3;
        this.flakeOpacity = 0.9;
        break;
      case 3:
        this.flakeSize = 4;
        this.flakeOpacity = 0.7;
        break;
      case 4:
        this.flakeSize = 6;
        this.flakeOpacity = 0.5;
        break;
      case 5:
        this.flakeSize = 8;
        this.flakeOpacity = 0.3;
        break;
    }
  }
}
