import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvanceSearch, APIResponse, SearchConfig } from '../model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {

  constructor(private http: HttpClient) {}

  getSearchConfig():Observable<APIResponse<SearchConfig[]>>{
    return this.http.get<APIResponse<SearchConfig[]>>(`${env.BASE_URL}/search/list`)
  }

  advanceSearch(config = {}):Observable<APIResponse<AdvanceSearch>>{
    return this.http.post<APIResponse<AdvanceSearch>>(`${env.BASE_URL}/search/v1/search`, {
      size: 50,
      ...config
    })
  }
}
