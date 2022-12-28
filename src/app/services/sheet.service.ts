/*
 * @Author: cwj
 * @Date: 2022-12-12 16:54:47
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-12 20:29:23
 * @Introduce: 
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, map, Observable, pluck, switchMap } from 'rxjs';
import { Song, SongSheet } from './data-types/common.types';
import { API_CONFIG, ServicesModule } from './services.module';
import { SongService } from './song.service';

@Injectable({
  providedIn: ServicesModule
})
export class SheetService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string,
    private songServe: SongService
  ) { }

  //通过id获取歌单详情
  getSongSheetDetail(id: number): Observable<SongSheet> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.uri + 'playlist/detail', { params })
      .pipe(map((res: { playlist: SongSheet }) => res.playlist));
  }


  //通过id获取歌曲
  //先拿到歌单详情，然后pluck出需要的tracks属性，最后switchMap出每首歌的url地址

  //pluck操作符是RxJS中的一个操作符，它可以从一个对象中选取出一个属性，并将该属性作为数据流的值发出。
  // playSheet(id: number): Observable<Song[]> {
  //   return this.getSongSheetDetail(id)
  //   .pipe(pluck('tracks'), switchMap(tracks => this.songServe.getSongList(tracks)));
  // }

  //可以使用 map 操作符和 RxJS 的 from 来实现与 pluck 相同的功能。
  //更具体地说，可以使用 map 操作符将 getSongSheetDetail 方法的结果映射到包含 tracks 属性的对象，然后使用 from 将该对象转换为 Observable。
  playSheet(id: number): Observable<Song[]> {
    return from(this.getSongSheetDetail(id))
      .pipe(
        map(result => result.tracks),
        switchMap(tracks => this.songServe.getSongList(tracks))
      );
  }

}
