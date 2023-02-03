/*
 * @Author: cwj
 * @Date: 2022-12-11 19:13:10
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-03 03:00:21
 * @Introduce: 
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Singer, SingerDetail } from './data-types/common.types';
import { API_CONFIG, ServicesModule } from './services.module';

type SingerParams = {
  //详情见API描述
  //分页
  offset: number;
  //每页多少
  limit: number;
  cat?: string;
}

//默认参数，首页右侧列表是默认的
const defaultParams = {
  offset: 0,
  limit: 9,
  cat: '5001'
}

@Injectable({
  providedIn: ServicesModule
})
export class SingerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }

  //获取进入页面的入驻歌手
  getEnterSinger(args: SingerParams = defaultParams): Observable<Singer[]> {
    //按照httpclient模块的传参方式
    //必须序列化
    const params = new HttpParams({ fromString: JSON.stringify(args) });
    return this.http.get(this.uri + 'artist/list', { params })
      .pipe(map((res: { artists: Singer[] }) => res.artists));
  }

  // 获取歌手详情和热门歌曲
  getSingerDetail(id: string): Observable<SingerDetail> {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.uri + 'artists', { params })
      .pipe(map(res => res as SingerDetail));
  }


  // 获取相似歌手(暂时写着，后续可能会使用上，取决于心情)
  getSimiSinger(id: string): Observable<Singer[]> {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.uri + 'simi/artist', { params })
      .pipe(map((res: { artists: Singer[] }) => res.artists));
  }

}
