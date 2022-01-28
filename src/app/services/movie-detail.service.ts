import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APIResponse, DetailType, SourceType } from '../model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailService {

  constructor(private http: HttpClient) { }

  async getMovieDetails(id: string){
    let sourceData: any;
    const detailParams = new HttpParams().set('id', id).set('category', '0');
    const dataDetail = await this.http.get<APIResponse<DetailType>>(`${env.BASE_URL}/movieDrama/get`, {params: detailParams}).toPromise();
    if(dataDetail){
        const sourceParams = {
            category: 0,
            contentId:id,
            episodeId: dataDetail.data.episodeVo[0].id,
            definition: 'GROOT_LD'
        }
        sourceData = await this.http.get<APIResponse<SourceType>>(`${env.BASE_URL}/media/previewInfo`, {params: sourceParams}).toPromise();
    }
    return {
        ...dataDetail?.data,
        ...sourceData?.data
    }
  }
}




