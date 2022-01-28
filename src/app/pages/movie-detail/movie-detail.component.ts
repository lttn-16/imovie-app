import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Details, LikeListType} from 'src/app/model';
import { MovieDetailService } from 'src/app/services/movie-detail.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  
  id: string;
  detailData: Details;

  constructor(private activatedRoute: ActivatedRoute, private movieDetailService: MovieDetailService, private router:Router) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getDetails(this.id);
    })
  }

  getDetails(id: string) : void {
    this.movieDetailService.getMovieDetails(id).then(data => {
      this.detailData = data;
    });
  }

  openDetails(item: LikeListType): void {
    if(item.category === 0){
      this.router.navigate(['movie', item.id]);
    }
    if(item.category === 1){
      this.router.navigate(['tv', item.id]);
    }
  }

  ngOnDestroy(): void {
      if(this.routeSub) this.routeSub.unsubscribe();
  }
}
