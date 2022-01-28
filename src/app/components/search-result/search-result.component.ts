import { Component, Input, OnInit } from '@angular/core';
import { SearchResultItem } from 'src/app/model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() resultsData: SearchResultItem[];
  @Input() keyword: string;

  constructor() { }

  ngOnInit(): void {}

  decodeQuery(keyword: string): string{
    return decodeURIComponent(keyword);
  }

}
