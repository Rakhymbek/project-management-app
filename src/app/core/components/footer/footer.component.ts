import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  people = [
    { name: 'yevgenii', githubUrl: 'https://github.com/fromarys' },
    { name: 'ramir', githubUrl: 'https://github.com/Ranami' },
    { name: 'rakhymbek', githubUrl: 'https://github.com/Rakhymbek' },
  ];

  ngOnInit(): void {}
}
