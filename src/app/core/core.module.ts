import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterLinkWithHref } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { DialogErrorComponent } from './components/dialog-error/dialog-error.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { SearchComponent } from './components/search/search.component';
import { ToasterComponent } from './components/toaster/toaster.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    NotFoundPageComponent,
    ClickOutsideDirective,
    NavigationComponent,
    CarouselComponent,
    DialogDeleteComponent,
    DialogErrorComponent,
    ConfirmationModalComponent,
    SearchComponent,
    ToasterComponent,
  ],
  imports: [SharedModule, RouterLinkWithHref],
  exports: [WelcomePageComponent, HeaderComponent, NavigationComponent, FooterComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
