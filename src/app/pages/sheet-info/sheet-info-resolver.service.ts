/*
 * @Author: cwj
 * @Date: 2023-02-01 20:46:28
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-01 21:32:09
 * @Introduce: 数据守卫：因为不能保证每个接口都相应得特别快，所以在NG里获取数据选择用resolve封装会更好
 */

/* 1. Snapshot英文原意是 快照 的意思， 因此 ActivatedRouteSnapshot指的是ActivatedRoute中一个永恒不变的状态。它是在组建初始化时的一个路由快照。如果我们只想要获取该组件初始化时路由的信息，那么我们就使用ActivatedRouteSnapshot. 它会忽略组件初始化之后路由的所有更新状态。而ActivatedRoute获取的是组件当前路由的信息。
2. ActivatedRouteSnapshot它存储的信息是普通的值， 而ActivatedRoute它的信息是放在一个Observable里面的，因此在使用时需要subscribe,同时使用完成后需要unsubscribe. */

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { SongSheet } from "src/app/services/data-types/common.types";
import { SheetService } from "src/app/services/sheet.service";

@Injectable()
export class SheetInfoResolverService implements Resolve<SongSheet> {
    constructor(private sheetServe: SheetService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<SongSheet> {
        return this.sheetServe.getSongSheetDetail(Number(route.paramMap.get('id'))); // // 获取参数， 使用 ParamMap获取的是路由配置中占位符所代表的参数
    }
}