import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoveryComponent } from './pages/discovery/discovery.component';
import { HistoryComponent } from './pages/history/history.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { TvDetailComponent } from './pages/tv-detail/tv-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  { path: 'discovery',
    component: DiscoveryComponent,
  },
  { path: 'history',
    component: HistoryComponent,
  },
  { path: 'movie/:id',
    component: MovieDetailComponent,
  },
  { path: 'tv/:id',
    component: TvDetailComponent,
  },
  { path: 'search',
    component: SearchResultsComponent,
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
