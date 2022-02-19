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
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&h=${height}&fit=outside`;
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
