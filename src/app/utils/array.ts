import { Song } from "../services/data-types/common.types";
import { getRandomInt } from "./number";

/*
 * @Author: cwj
 * @Date: 2022-12-20 23:14:10
 * @LastEditors: cwj
 * @LastEditTime: 2023-01-04 00:17:58
 * @Introduce: 工具类
 */
export function inArray(arr: any[], target: any): boolean {
    return arr.indexOf(target) !== -1;
}

export function shuffle<T>(arr: T[]): T[] {
    //先保存副本
    const result = arr.slice();
    for (let i = 0; i < result.length; i++) {
        //0和i之间的一个随机数
        const r = getRandomInt([0, i]);
        [result[i], result[r]] = [result[r], result[i]];
    }
    return result;
}

//查找当前歌曲在列表中的索引
export function findIndex(list: Song[], currentSong: Song): number {
    return list.findIndex(item => item.id === currentSong.id)
}
