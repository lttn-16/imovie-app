import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Details, EpisodeVoType } from 'src/app/model';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.scss']
})
export class DetailsMovieComponent implements OnInit {
  @Input() detailData: Details;
  @Output() onClickEpisode = new EventEmitter();
  episode: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param: Params) => {
      this.episode = +param['episode'] || 1;
    })
  }

  onClickEpi(epiItem: EpisodeVoType){
    this.onClickEpisode.emit(epiItem);
  }
}
