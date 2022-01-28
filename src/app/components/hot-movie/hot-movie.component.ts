import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HomeSection, RecommendContentVOList } from 'src/app/model';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-hot-movie',
  templateUrl: './hot-movie.component.html',
  styleUrls: ['./hot-movie.component.scss']
})
export class HotMovieComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper: SwiperComponent;
  @Input() data: HomeSection;
  @Output() onOpenDetail: EventEmitter<RecommendContentVOList> = new EventEmitter();

  config: SwiperOptions = {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 18,
    breakpoints:{
      500:{
           slidesPerView: 3, 
      },

      1024:{
        slidesPerView: 4, 
      }
    }
  };

  constructor() {}

  ngOnInit(): void {
  }

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
    this.onOpenDetail.emit(item);
  } 

}
