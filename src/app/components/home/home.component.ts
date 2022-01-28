import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RecommendContentVOList } from 'src/app/model';
import  { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper: SwiperComponent;
  @Input() bannerData: RecommendContentVOList[];
  @Output() onDetail: EventEmitter<RecommendContentVOList> = new EventEmitter();
  
  config: SwiperOptions = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
  };

  constructor() { }

  ngOnInit(): void {}

  resizeImage(url: string, width = "", height = "") {
    return `https://agvmolqooq.cloudimg.io/v7/${url}?width=${width}&height=${height}`
  }

  slideNext() {
    this.swiper.swiperRef.slideNext(800);
  }

  slidePrev() {
    this.swiper.swiperRef.slidePrev(800);
  }
  
  onClick(item: RecommendContentVOList): void{
    this.onDetail.emit(item);
  } 
}
