import { Component, OnInit } from '@angular/core';

interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
