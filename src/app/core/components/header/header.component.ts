import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EStorage, ELang } from '../../models/enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public currentLang = localStorage.getItem(EStorage.language) || ELang.en;

  public isChecked = this.currentLang === ELang.en;

  constructor(private translate: TranslateService) {
    this.translate.use(this.currentLang);
  }

  ngOnInit(): void {}

  switchLanguage() {
    this.currentLang = this.isChecked ? ELang.en : ELang.ru;
    localStorage.setItem(EStorage.language, this.currentLang);
    this.translate.use(this.currentLang);
  }
}
