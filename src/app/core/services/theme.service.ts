import { Injectable } from '@angular/core';
import { EStorage } from '../models/enums';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkEnable: boolean = JSON.parse(localStorage.getItem(EStorage.isDarkMode)!);
}
