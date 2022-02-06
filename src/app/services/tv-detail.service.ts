import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, DetailType, SourceType } from '../model';
import { environment as env } from 'src/environments/environment';

export interface Episode{
  category: number,
  contentId:string,
  episodeId: number,
  definition: string
}

@Injectable({
  providedIn: 'root'
})
export class TvDetailService {

  constructor(private http: HttpClient) {}

  async getTVDetails(id: string, idEpisode?: number){
    let episodeData: any;
    const detailParams = new HttpParams().set('id', id).set('category', '1');
    const dataDetail = await this.http.get<APIResponse<DetailType>>(`${env.BASE_URL}/movieDrama/get`, {params: detailParams}).toPromise();
    if(dataDetail){
        const episodeParams = {
            category: 1,
            contentId:id,
            episodeId: idEpisode ? idEpisode : dataDetail.data.episodeVo[0].id,
            definition: 'GROOT_HD'
        }
        episodeData = await this.http.get<APIResponse<SourceType>>(`${env.BASE_URL}/media/previewInfo`, {params: episodeParams}).toPromise();
    }
    return {
        ...dataDetail?.data,
        ...episodeData?.data
    }
  }
}
