import { Component, Input, OnInit } from '@angular/core';

interface Person {
  name: string;
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  public team: Person[] = [
    {
      name: 'rakhymbek',
      imageSrc: 'https://avatars.githubusercontent.com/u/85493256?v=4',
      imageAlt: 'rakhymbek',
    },
    {
      name: 'yevgenii',
      imageSrc: 'https://avatars.githubusercontent.com/u/79139639?v=4',
      imageAlt: 'Yevgenii',
    },
    {
      name: 'ramir',
      imageSrc: 'https://avatars.githubusercontent.com/u/61286850?v=4',
      imageAlt: 'Ramir',
    },
  ];

  public selectedIndex = 0;

  @Input() autoplay = true;

  @Input() interval = 4000; // default interval - 4 seconds

  ngOnInit(): void {
    if (this.autoplay) {
      this.switchSlides();
    }
  }

  public selectImage(index: number): void {
    this.selectedIndex = index;
  }

  public onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.team.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  public onNextClick(): void {
    if (this.selectedIndex === this.team.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  private switchSlides(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.interval);
  }
}
