import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Output() public closeNavigation = new EventEmitter();

  ngOnInit(): void {}

  onCloseNavigation() {
    this.closeNavigation.emit();
  }
}
