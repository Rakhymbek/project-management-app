import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ELang, EStorage } from '../../models/enums';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public currentLang = localStorage.getItem(EStorage.language) || ELang.en;

  public isChecked = this.currentLang === ELang.en;

  @Output() public closeNavigation = new EventEmitter();

  constructor(private translate: TranslateService) {
    this.translate.use(this.currentLang);
  }

  ngOnInit(): void {}

  onCloseNavigation() {
    this.closeNavigation.emit();
  }

  switchLanguage() {
    this.currentLang = this.isChecked ? ELang.en : ELang.ru;
    localStorage.setItem(EStorage.language, this.currentLang);
    this.translate.use(this.currentLang);
  }
}
