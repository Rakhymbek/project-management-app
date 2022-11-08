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

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    NotFoundPageComponent,
    ClickOutsideDirective,
    NavigationComponent,
    CarouselComponent,
  ],
  imports: [SharedModule, RouterLinkWithHref],
  exports: [
    WelcomePageComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
