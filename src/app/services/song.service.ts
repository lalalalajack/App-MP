/*
 * @Author: cwj
 * @Date: 2022-12-12 18:15:29
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-02 19:24:53
 * @Introduce: 
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, map, observable, Observable } from 'rxjs';
import { Lyric, Song, SongSheet, SongUrl } from './data-types/common.types';
import { API_CONFIG, ServicesModule } from './services.module';

@Injectable({
  providedIn: ServicesModule,
})
export class SongService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }

  //通过id获取歌曲播放地址
  getSongUrl(ids: string): Observable<SongUrl[]> {
    const params = new HttpParams().set('id', ids);
    return from(this.http.get(this.uri + 'song/url', { params }))
      .pipe(
        map((res: { data: SongUrl[] }) => res.data)
      );
  }

  getSongList(songs: Song | Song[]): Observable<Song[]> {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs];
    const ids = songArr.map(item => item.id).join(',');

    // return this.getSongUrl(ids).pipe(map(urls => this.generateSongList(songArr, urls)));
    //通过封装从generateSongList返回的普通对象转为observable对象
    // return Observable.create(observer => {
    //   this.getSongUrl(ids).subscribe(urls => {
    //     //通过next方法使得外边订阅流的地方拿到数据
    //     observer.next(this.generateSongList(songArr, urls));
    //   });
    // });  

    //使用from方法简化操作
    return from(this.getSongUrl(ids))
      .pipe(
        map(urls => this.generateSongList(songArr, urls))
      );
  }

  //拼接方法 [Song]+[url]
  // private generateSongList(songs: Song[], urls: SongUrl[]): Song[] {
  //   const result = [];
  //   songs.forEach(song => {
  //     const url = urls.find(songUrl => songUrl.id === song.id).url;
  //     if (url) {
  //       result.push({ ...song, url });
  //     }
  //   });
  //   return result;
  // }
  private generateSongList(songs: Song[], urls: SongUrl[]): Song[] {
    return songs.map(song => {
      const url = urls.find(songUrl => songUrl.id === song.id).url;
      return url ? { ...song, url } : song;
    });
  }

  // 根据ID获取歌曲歌词
  getLyric(id: number): Observable<Lyric> {
    const params = new HttpParams().set('id', id.toString());
    //过滤得出需要的两个对象
    return this.http.get(this.uri + 'lyric', { params })
      .pipe(map(res => {
        try {
          return {
            lyric: res['lrc'].lyric,
            tlyric: res['tlyric'].lyric,
          }
        } catch (error) {
          return {
            lyric: '',
            tlyric: '',
          }
        }

      }))
  }
}
