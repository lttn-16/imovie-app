import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, SearchResultList } from '../model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  public searchKeywords(keyword: string):Observable<APIResponse<any>>{
    return this.http.post<APIResponse<any>>(`${env.BASE_URL}/search/searchLenovo`, {
      searchKeyWord: keyword,
      size: 15,
    });
  }

  public searchResult(keyword: string):Observable<APIResponse<SearchResultList>>{
    return this.http.post<APIResponse<SearchResultList>>(`${env.BASE_URL}/search/v1/searchWithKeyWord`, {
      searchKeyWord: keyword,
      size: 50,
      sort: "",
      searchType: "",
    })
  }
}
