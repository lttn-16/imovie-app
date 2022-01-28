import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TopSearched } from 'src/app/model';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Input() topSearch: TopSearched[];
  @Output() onOpenDetailTopSearch: EventEmitter<TopSearched> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  resizeImage(url: string, width = "", height = "") {
    return `https://agvmolqooq.cloudimg.io/v7/${url}?width=${width}&height=${height}`
  }

  onClick(item: TopSearched): void{
    this.onOpenDetailTopSearch.emit(item);
  } 
}
