/*
 * @Author: cwj
 * @Date: 2022-12-09 21:49:47
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-11 17:49:00
 * @Introduce: 
 */
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG, ServicesModule } from './services.module';
import { Banner, HotTag, SongSheet } from './data-types/common.types';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: ServicesModule
})
export class HomeService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }

  getBanners(): Observable<Banner[]> {
    return this.http.get(this.uri + 'banner')
      .pipe(map((res: { banners: Banner[] }) => res.banners));
    //return this.http.get<{banners: Banner[]}>(this.uri + 'banner') ;
  }

  getHotTags(): Observable<HotTag[]> {
    return this.http.get(this.uri + 'playlist/hot')
      .pipe(map((res: { tags: HotTag[] }) => {
        return res.tags.sort((x:HotTag,y:HotTag)=>x.position-y.position).slice(0,5);
      }));
  }
  
  getPersonalSheetList():Observable<SongSheet[]> {
    return this.http.get(this.uri + 'personalized')
      .pipe(map((res: { result: SongSheet[] }) => res.result.slice(0,16)));
  }
}
