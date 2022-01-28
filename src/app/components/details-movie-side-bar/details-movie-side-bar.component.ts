import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Details, LikeListType } from 'src/app/model';

@Component({
  selector: 'app-details-movie-side-bar',
  templateUrl: './details-movie-side-bar.component.html',
  styleUrls: ['./details-movie-side-bar.component.scss']
})
export class DetailsMovieSideBarComponent implements OnInit {
  @Input() detailData: Details;
  @Output() onOpenDetail: EventEmitter<LikeListType> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(item: LikeListType): void{
    this.onOpenDetail.emit(item);
  } 

  resizeImage(url: string, width = "", height = "") {
    return `https://agvmolqooq.cloudimg.io/v7/${url}?width=${width}&height=${height}`
  }

}
