import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResultItem } from 'src/app/model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data: SearchResultItem;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  resizeImage(url: string, width = "", height = "") {
    return `https://agvmolqooq.cloudimg.io/v7/${url}?width=${width}&height=${height}`
  }

  openDetails(item: SearchResultItem): void {
    if(item.domainType === 0){
      this.router.navigate(['movie', item.id]);
    }
    if(item.domainType === 1){
      this.router.navigate(['tv', item.id]);
    }
  }

}
