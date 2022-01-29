import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, TopBar, TopSearched } from 'src/app/model';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit, OnDestroy {
  public isClicked = false;
  public topSearchData: TopSearched[];
  private topBarSub: Subscription;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.getTopBar();
  }

  getTopBar(): void{
    this.topBarSub = this.homeService.getTopSearched().subscribe((data: APIResponse<TopBar<TopSearched>>) => {
      this.topSearchData = data.data.list;
    })
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
    if(this.topBarSub) this.topBarSub.unsubscribe();
  }

}
