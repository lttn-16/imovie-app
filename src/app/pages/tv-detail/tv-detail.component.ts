import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Details, EpisodeVoType, LikeListType } from 'src/app/model';
import { TvDetailService } from 'src/app/services/tv-detail.service';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.scss']
})
export class TvDetailComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  
  id: string;
  detailData: Details;

  constructor(private activatedRoute: ActivatedRoute, private router:Router, private tvDetailService: TvDetailService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getDetails(this.id);
    })
  }

  onClickEpi(epi: EpisodeVoType):void{
    this.getDetails(this.id, epi.id);
  }

  getDetails(id: string, episode?: number) : void {
    this.tvDetailService.getTVDetails(id, episode).then(data => {
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
