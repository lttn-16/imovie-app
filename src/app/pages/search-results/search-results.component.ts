import { Component, OnInit } from '@angular/core';
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
export class SearchResultsComponent implements OnInit {
  keyword: string;
  public results: SearchResultItem[]; 
  public topSearchData: TopSearched[];
  private topBarSub: Subscription;

  routeSub: Subscription;
  keywordSub: Subscription;

  constructor(private route:ActivatedRoute, private service:SearchService, private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param:Params) => {
      this.keyword = param['q'];
      this.getSearchResut(this.keyword);
    })
    this.getTopBar();
  }

  getSearchResut(keyword: string) : void {
    this.service.searchResult(keyword).subscribe(data => {
      this.results = data.data.searchResults;
    });
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

  resizeImage(url: string, width = "", height = "") {
    return `https://agvmolqooq.cloudimg.io/v7/${url}?width=${width}&height=${height}`
  }

}
