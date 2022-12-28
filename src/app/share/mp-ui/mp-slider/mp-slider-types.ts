import { Observable } from "rxjs";

/*
 * @Author: cwj
 * @Date: 2022-12-15 23:03:21
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-21 02:33:56
 * @Introduce: 
 */
export type MpSliderStyle = {
    width?: string | null;
    height?: string | null;
    left?: string | null;
    bottom?: string | null;
}

export type SliderEventObserverConfig = {
    start: string;
    move: string;
    end: string;
    filterFunc: (e: Event) => boolean;
    pluckKey: string[];
    startPlucked$?: Observable<number>;
    moveResolve$?: Observable<number>;
    end$?: Observable<Event>;
}

export type SliderValue = number | null;