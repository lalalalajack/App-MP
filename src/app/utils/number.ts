/*
 * @Author: cwj
 * @Date: 2022-12-21 00:48:40
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-22 21:58:55
 * @Introduce: 用于限制数值在给定的max和min之间
 */

export function limitNumberInRange(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max);
}

export function getPercent(min: number, max: number, val: number): number {
    return ((val-min)/(max-min))*100
}

//取[min,max]间的随机数
export function getRandomInt(range:[number,number]):number{
    return Math.floor(Math.random()*(range[1]-range[0]+1)+range[0]);
} 