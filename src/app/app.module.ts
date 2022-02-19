import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';

import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomeComponent } from './components/home/home.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { DiscoveryComponent } from './pages/discovery/discovery.component';
import { HistoryComponent } from './pages/history/history.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SearchComponent } from './components/search/search.component';
import { HotMovieComponent } from './components/hot-movie/hot-movie.component';
import { HttpHeaderInterceptor } from './interceptors/http-headers.interceptor';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { DetailsMovieComponent } from './components/details-movie/details-movie.component';
import { DetailsMovieSideBarComponent } from './components/details-movie-side-bar/details-movie-side-bar.component';
import { TvDetailComponent } from './pages/tv-detail/tv-detail.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CardComponent } from './components/card/card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';
import { LoginComponent } from './pages/login/login.component';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HomeComponent,
    TopBarComponent,
    DiscoveryComponent,
    HistoryComponent,
    HomepageComponent,
    SearchComponent,
    HotMovieComponent,
    MovieDetailComponent,
    HeaderComponent,
    DetailsMovieComponent,
    DetailsMovieSideBarComponent,
    TvDetailComponent,
    SearchResultsComponent,
    SearchResultComponent,
    CardComponent,
    LoadingComponent,
    HomeLayoutComponent,
    MainLayoutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    SwiperModule,
    FormsModule,
    ClickOutsideModule,
    InfiniteScrollModule,
    MatTabsModule,
    MatSelectModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
