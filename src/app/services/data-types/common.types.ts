/*
 * @Author: cwj
 * @Date: 2022-12-09 21:56:12
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-02 23:11:35
 * @Introduce: 
 */
//轮播图
export type Banner = {
    targetId: number;
    url: string;
    imageUrl: string;
}

export type HotTag = {
    id: number;
    name: string;
    position: number;
}

//歌单
export type SongSheet = {
    id: number;
    userId: number;
    name: string;
    picUrl: string;
    coverImgUrl: string;
    playCount: number;//播放量
    tags: string[]; //标签
    createTime: number; //创建时间戳
    creator: { nickname: string; avatarUrl: string; }; //创建者{昵称；头像}
    description: string; //描述
    subscribedCount: number; //订阅量
    shareCount: number; //分享量
    commentCount: number; //评论数
    subscribed: boolean; //当前账户是否已经订阅（暂设）
    tracks: Song[]; 
}

//歌手
export type Singer = {
    id: number;
    name: string;
    picUrl: string;
    albumSize: number;//专辑数
}

//歌曲
export type Song = {
    id: number;
    name: string;
    url: string;
    ar: Singer[];//歌手
    al: { id: number, name: string, picUrl: string };//来自专辑
    dt: number;
}

//播放地址
export type SongUrl = {
    id: number,
    url: string,
}

//歌词
export type Lyric = {
    lyric: string;    //原文
    tlyric: string;     //译文
}

// 歌单列表
export type SheetList = {
    playlists: SongSheet[],
    total: number,
}


