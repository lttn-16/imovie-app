import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Details, EpisodeVoType, LikeListType, SubList } from 'src/app/model';
import { HistoryService } from 'src/app/services/history.service';
import { TvDetailService } from 'src/app/services/tv-detail.service';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.scss']
})
export class TvDetailComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  subList: SubList[];
  
  id: string;
  detailData: Details;

  constructor(private activatedRoute: ActivatedRoute, private router:Router, private tvDetailService: TvDetailService, private historyService: HistoryService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getDetails(this.id);
    })
  }

  onClickEpi(epi: EpisodeVoType):void{
    this.getDetails(this.id, epi.id);
  }

  getDetails(id: string, episode?: number) {
    this.tvDetailService.getTVDetails(id, episode).then(data => {
      this.detailData = {...data, mediaUrl: "/" + data.mediaUrl.substring(data.mediaUrl.indexOf("/") + 1)};
      this.historyService.addHistory(this.detailData);
      this.getSublist();
    });
  }

  getSublist(){
    this.activatedRoute.queryParams.subscribe((param: Params) => {
      const episodeNumber = +param['episode'] || 1;
      const list = this.detailData.episodeVo.find(item => item.seriesNo ===  episodeNumber);
      if(list){
        this.subList = list.subtitlingList;
      }
    })
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
