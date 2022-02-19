import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, TopBar, TopSearched, User } from 'src/app/model';
import { AuthService } from 'src/app/services/auth.service';
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
  user: User | undefined;

  constructor(public auth: AuthService, private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.getTopBar();
    this.auth.user$.subscribe(data => {
      if(data) this.user = data;
    })
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

  signOut(){
    this.auth.signOut();
    this.user = undefined;
  }

  ngOnDestroy(): void {
    if(this.topBarSub) this.topBarSub.unsubscribe();
  }

}
