import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Details, EpisodeVoType, SubList } from 'src/app/model';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.scss']
})
export class DetailsMovieComponent implements OnInit,OnDestroy {
  @Input() detailData: Details;
  @Input() subList: SubList[];
  @Output() onClickEpisode = new EventEmitter();
  
  episode: number;
  routeSub: Subscription;
  
  constructor(private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe((param: Params) => {
      this.episode = +param['episode'] || 1;
    })
  }

  onClickEpi(epiItem: EpisodeVoType){
    this.onClickEpisode.emit(epiItem);
  }

  subtitleProxy(url: string) {
    return `https://srt-to-vtt.vercel.app?url=${encodeURIComponent(url)}`;
  }

  ngOnDestroy(): void {
      if(this.routeSub) this.routeSub.unsubscribe();
  }
}
