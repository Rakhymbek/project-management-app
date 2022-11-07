import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsItemComponent } from './boards-item.component';

describe('BoardItemComponent', () => {
  let component: BoardsItemComponent;
  let fixture: ComponentFixture<BoardsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
