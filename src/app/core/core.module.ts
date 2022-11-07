import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    NotFoundPageComponent,
    ClickOutsideDirective,
    NavigationComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [WelcomePageComponent, HeaderComponent, NavigationComponent, SharedModule],
})
export class CoreModule {}
