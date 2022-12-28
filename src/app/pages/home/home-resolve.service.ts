/*
 * @Author: cwj
 * @Date: 2022-12-11 20:26:19
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-11 22:36:55
 * @Introduce: 因为不能保证每个接口都相应得特别快，所以在NG里获取数据选择用resolve封装会更好
 */
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { first, forkJoin, Observable } from "rxjs";
import { Banner, HotTag, Singer, SongSheet } from "src/app/services/data-types/common.types";
import { HomeService } from "src/app/services/home.service";
import { SingerService } from "src/app/services/singer.service";

type HomeDataType = [Banner[], HotTag[], SongSheet[], Singer[]];

@Injectable()
export class HomeResolverService implements Resolve<HomeDataType>{
    constructor(
        private homeServe: HomeService,
        private singerServe: SingerService
    ) { }
    resolve(): Observable<HomeDataType> {
        return forkJoin([
            this.homeServe.getBanners(),
            this.homeServe.getHotTags(),
            this.homeServe.getPersonalSheetList(),
            this.singerServe.getEnterSinger()
        ]).pipe(first()); //只取第一个
    }
}