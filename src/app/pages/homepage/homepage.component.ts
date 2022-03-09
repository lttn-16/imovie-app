import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Home, HomeSection, RecommendContentVOList } from 'src/app/model';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  public homeData: HomeSection[];
  public bannerData: RecommendContentVOList[];
  private homeSub: Subscription;
  
  private index = 0;
  public loading = false;
  private outOfData = false;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.getHomePage();
  }

  getHomePage(): void{
    this.homeSub = this.homeService.getHome(this.index).subscribe((data: APIResponse<Home<HomeSection>>) => {
      const banner = data.data.recommendItems.filter(d => d.homeSectionType === 'BANNER');
      if(banner){
        this.bannerData = banner[1].recommendContentVOList;
      }
      const dataWithoutBanner = data.data.recommendItems.filter(d => d.homeSectionName !== "" && d.bannerProportion === null);
      if(dataWithoutBanner) this.homeData = dataWithoutBanner;
    })
  } 


  openDetails(item: RecommendContentVOList): void {
    if(item.category === null){
      const type = +item.jumpAddress.slice(-1);
      const idStart = item.jumpAddress.indexOf('=');
      const idEnd = item.jumpAddress.indexOf('&');
      const id = item.jumpAddress.slice(idStart+1, idEnd);
      if(type === 0){
        this.router.navigate(['movie', id]);
      }
      if(type === 1){
        this.router.navigate(['tv', id]);
      }
    }
    if(item.category === 0){
      this.router.navigate(['movie', item.id]);
    }
    if(item.category === 1){
      this.router.navigate(['tv', item.id]);
    }
  }

  
  onScroll() {
    if(!this.outOfData){
      this.index += 1;
      this.loading = true;
      this.homeService.getHome(this.index).subscribe((data: APIResponse<Home<HomeSection>>) => {
        const dataWithoutBanner = data.data.recommendItems.filter(d => d.homeSectionName !== "" && d.bannerProportion === null);
        if(dataWithoutBanner) this.homeData = [...this.homeData,...dataWithoutBanner];
        
        // Filter unique homeSectionName
        this.homeData = [...new Map(this.homeData.map((item) => [item.homeSectionName, item])).values()];
      
        if(dataWithoutBanner.length === 0) this.outOfData = true;
        this.loading = false;
      }); 
    }
  }

  ngOnDestroy(): void {
      if(this.homeSub) this.homeSub.unsubscribe();
  }

}
