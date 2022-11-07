import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public navigationToggle = new EventEmitter();

  ngOnInit(): void {}

  onToggleNavigation() {
    this.navigationToggle.emit();
  }
}
