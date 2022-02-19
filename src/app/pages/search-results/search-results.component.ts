import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, SearchResultItem, TopBar, TopSearched } from 'src/app/model';
import { HomeService } from 'src/app/services/home.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  keyword: string;
  public results: SearchResultItem[]; 
  public topSearchData: TopSearched[];
  
  routeSub: Subscription;
  keywordSub: Subscription;
  topbarSub: Subscription;

  constructor(private route:ActivatedRoute, private service:SearchService, private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe((param:Params) => {
      this.keyword = param['q'];
      this.getSearchResut(this.keyword);
    })
    this.getTopBar();
  }

  getSearchResut(keyword: string) : void {
    this.keywordSub = this.service.searchResult(keyword).subscribe(data => {
      this.results = data.data.searchResults;
    });
  }

  getTopBar(): void{
    this.topbarSub = this.homeService.getTopSearched().subscribe((data: APIResponse<TopBar<TopSearched>>) => {
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

  resizeImage(url: string, width = "", height = "") {
    return `https://acqdgduijq.cloudimg.io/${url}?width=${width}&height=${height}`
  }

  ngOnDestroy(): void {
      if(this.keywordSub) this.keywordSub.unsubscribe();
      if(this.routeSub) this.routeSub.unsubscribe();
      if(this.topbarSub) this.topbarSub.unsubscribe();
  }

}
