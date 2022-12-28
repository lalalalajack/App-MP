/*
 * @Author: cwj
 * @Date: 2022-12-09 21:56:12
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-12 19:51:58
 * @Introduce: 
 */
//轮播图
export type Banner = {
    targetId:number;
    url:string;
    imageUrl:string;
}

export type HotTag = {
    id:number;
    name:string;
    position:number;
}

//歌单
export type SongSheet = {
    id:number;
    name:string;
    picUrl:string;
    playCount:number;//播放量
    tracks:Song[];
}

//歌手
export type Singer = {
    id:number;
    name:string;
    picUrl:string;
    albumSize:number;//专辑数
}

//歌曲
export type Song = {
    id:number;
    name:string;
    url:string;
    ar:Singer[];//歌手
    al:{id:number,name:string,picUrl:string};//来自专辑
    dt:number;
}

//播放地址
export type SongUrl = {
    id:number,
    url:string,
}
