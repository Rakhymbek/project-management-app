import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() public navigationToggle = new EventEmitter();

  constructor(public themeService: ThemeService) {}

  onToggleNavigation() {
    this.navigationToggle.emit();
  }
}
