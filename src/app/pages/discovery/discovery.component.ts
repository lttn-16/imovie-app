import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { AdvanceSearch, AdvanceSearchItem, APIResponse, OptionList, SearchConfig } from 'src/app/model';
import { DiscoveryService } from 'src/app/services/discovery.service';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss']
})
export class DiscoveryComponent implements OnInit, OnDestroy {
  selectedRegion = '';
  selectedCategory = '';
  selectedPeriod = '';
  selectedSub = '';
  selectedRecent = 'up';
  data: SearchConfig[];
  tab = 'TV Series';

  regionsList: OptionList[];
  categoryList: OptionList[];
  periodList:  OptionList[];
  subList: OptionList[];
  recentList: OptionList[];

  configItem: AdvanceSearchItem[];

  searchSub: Subscription;

  constructor(private discService:DiscoveryService) { }

  ngOnInit(): void {
    this.dispatchList();
  }

  filterTypes(type: string, data: any[]){
    return data.filter(item => item.name === type);
  }

  dispatchSearch(){
    const configs = {
      area: this.selectedRegion,
      category: this.selectedCategory,
      order: this.selectedRecent,
      params: this.data[0].params,
      sort: "",
      subtitles: this.selectedSub,
      year: this.selectedPeriod
    }
    this.searchSub = this.discService.advanceSearch(configs).subscribe((data:APIResponse<AdvanceSearch>) => {
      this.configItem = data.data.searchResults;
      console.log(this.configItem);
    })
  }

  dispatchList(){
    this.searchSub = this.discService.getSearchConfig().subscribe((data:APIResponse<SearchConfig[]>) => {
      this.data = this.filterTypes(this.tab, data.data);

      this.regionsList = this.filterTypes("All regions", this.data[0].screeningItems )[0].items;
      const existRegionsList = this.regionsList.filter(item => item.params === this.selectedRegion);
      if(existRegionsList.length === 0) this.selectedRegion = ""; 

      this.categoryList = this.filterTypes("All Categories", this.data[0].screeningItems )[0].items;
      const existCategoryList = this.categoryList.filter(item => item.params === this.selectedCategory);
      if(existCategoryList.length === 0) this.selectedCategory = ""; 

      this.periodList = this.filterTypes("All Time Periods", this.data[0].screeningItems )[0].items;
      const existPeriodList = this.periodList.filter(item => item.params === this.selectedPeriod);
      if(existPeriodList.length === 0) this.selectedPeriod = ""; 

      this.subList = this.filterTypes("字幕筛选", this.data[0].screeningItems )[0].items;
      const existSubList = this.subList.filter(item => item.params === this.selectedSub);
      if(existSubList.length === 0) this.selectedSub = ""; 

      this.recentList = this.filterTypes("排序规则", this.data[0].screeningItems )[0].items;
      const existRecentList = this.recentList.filter(item => item.params === this.selectedRecent);
      if(existRecentList.length === 0) this.selectedRecent = "up"; 
      
      this.dispatchSearch();
    })
  }


  onTabChanged(event: MatTabChangeEvent) {
    this.tab = event.tab.textLabel;
    this.dispatchList();
  }

  ngOnDestroy(): void {
      if(this.searchSub) this.searchSub.unsubscribe();
  }
}
