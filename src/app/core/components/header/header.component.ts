import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showMenu = false;

  showLanguagesDropdown = false;

  ngOnInit(): void {}

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  toggleLanguagesDropdown() {
    this.showLanguagesDropdown = !this.showLanguagesDropdown;
  }

  handleClickOutsideLanguageDropdown() {
    console.log('click');
    if (this.showLanguagesDropdown) {
      this.showLanguagesDropdown = !this.showLanguagesDropdown;
    }
  }
}
