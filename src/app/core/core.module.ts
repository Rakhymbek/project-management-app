import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RouterLinkWithHref } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, WelcomePageComponent, NotFoundPageComponent, CarouselComponent],
  imports: [CommonModule, SharedModule, RouterLinkWithHref],
  exports: [HeaderComponent, WelcomePageComponent, FooterComponent],
})
export class CoreModule {}
