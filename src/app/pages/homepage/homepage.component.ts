import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Home, HomeSection, RecommendContentVOList, TopBar, TopSearched } from 'src/app/model';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  public homeData: HomeSection[];
  public bannerData: RecommendContentVOList[];
  public topSearchData: TopSearched[];
  public isClicked = false;

  private homeSub: Subscription;
  private topBarSub: Subscription;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.getHomePage();
    this.getTopBar();
  }

  getHomePage(): void{
    this.homeSub = this.homeService.getHome().subscribe((data: APIResponse<Home<HomeSection>>) => {
      const banner = data.data.recommendItems.filter(d => d.homeSectionType === 'BANNER');;
      if(banner){
        this.bannerData = banner[0].recommendContentVOList;
      }
      const dataWithoutBanner = data.data.recommendItems.filter(d => d.homeSectionName !== "");
      if(dataWithoutBanner) this.homeData = dataWithoutBanner;
    })
  } 

  getTopBar(): void{
    this.topBarSub = this.homeService.getTopSearched().subscribe((data: APIResponse<TopBar<TopSearched>>) => {
      this.topSearchData = data.data.list;
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

  openDetailsTopBar(item: TopSearched): void {
    if(item.domainType === 0){
      this.router.navigate(['movie', item.id]);
    }
    if(item.domainType === 1){
      this.router.navigate(['tv', item.id]);
    }
  }

  onClickIcon () {
    this.isClicked = true;
  };

  clickBackdrop() {
    this.isClicked = false;
  }

  ngOnDestroy(): void {
      if(this.homeSub) this.homeSub.unsubscribe();
      if(this.topBarSub) this.topBarSub.unsubscribe();
  }

}
