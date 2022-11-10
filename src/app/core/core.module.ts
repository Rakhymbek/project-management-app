import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterLinkWithHref } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    NotFoundPageComponent,
    ClickOutsideDirective,
    NavigationComponent,
    CarouselComponent,
    ConfirmationModalComponent,
  ],
  imports: [SharedModule, RouterLinkWithHref, TranslateModule.forChild()],
  exports: [
    WelcomePageComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    SharedModule,
  ],
})
export class CoreModule {}
