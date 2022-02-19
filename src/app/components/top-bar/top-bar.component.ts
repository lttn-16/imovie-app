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
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&h=${height}&fit=outside`;
  }

  onClick(item: TopSearched): void{
    this.onOpenDetailTopSearch.emit(item);
  } 
}
