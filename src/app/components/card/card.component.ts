import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data: any;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  resizeImage(url: string, width = "", height = "") {
    return `https://agvmolqooq.cloudimg.io/v7/${url}?width=${width}&height=${height}`
  }

  openDetails(item: any): void {
    if(item.domainType === 0 || item.category === 0){
      this.router.navigate(['movie', item.id]);
    }
    if(item.domainType === 1 || item.category === 1){
      this.router.navigate(['tv', item.id]);
    }
  }

}
