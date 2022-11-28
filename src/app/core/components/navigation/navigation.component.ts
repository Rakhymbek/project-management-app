import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BoardElements, EDialogEvents, ELang, EStorage } from '../../models/enums';
import { UserDataService } from '../../../auth/services/user-data.service';
import { DialogCreateData, DialogOptions } from '../../models/common.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoardService } from '../../services/board.service';
import { DialogCreateComponent } from '../../../main/components/dialog-create/dialog-create.component';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public currentLang = localStorage.getItem(EStorage.language) || ELang.en;

  public isChecked = this.currentLang === ELang.en;

  @Output() public closeNavigation = new EventEmitter();

  constructor(
    private translate: TranslateService,
    public userDataService: UserDataService,
    private boardService: BoardService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateData,
    public themeService: ThemeService,
  ) {
    this.translate.use(this.currentLang);
  }

  onCloseNavigation() {
    this.closeNavigation.emit();
  }

  switchLanguage() {
    this.currentLang = this.isChecked ? ELang.en : ELang.ru;
    localStorage.setItem(EStorage.language, this.currentLang);
    this.translate.use(this.currentLang);
  }

  switchTheme() {
    this.themeService.isDarkEnable = !this.themeService.isDarkEnable;
    localStorage.setItem(EStorage.isDarkMode, JSON.stringify(this.themeService.isDarkEnable));
  }

  public openDialog(event: string, id?: string): void {
    const options: DialogOptions = {
      width: '300px',
      data: { event, element: BoardElements.board, id },
    };
    const dialogRef = this.getDialogRef(options);
    dialogRef.afterClosed().subscribe((value) => {
      if (value?.event === EDialogEvents.create) {
        this.createBoard(value);
        this.router.navigate(['/main']);
      }
    });
  }

  private getDialogRef(options: DialogOptions): MatDialogRef<DialogCreateComponent> {
    return this.dialog.open(DialogCreateComponent, options);
  }

  private createBoard(data: DialogCreateData): void {
    this.boardService.createBoard(data.title, data.description).subscribe((board) => {
      this.boardService.boards?.push(board);
    });
  }

  toLogOut() {
    this.userDataService.removeUserData();
  }
}
