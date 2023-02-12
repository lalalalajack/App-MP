/*
 * @Author: cwj
 * @Date: 2023-02-13 03:15:19
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-13 03:23:11
 * @Introduce: 
 */
import { Song, SongSheet } from './common.types';

export interface Signin {
  code: number;
  point?: number;
  msg?: string;
};

export interface User {
//   // 等级
//   level?: number;

//   // 听歌记录
//   listenSongs?: number;

  profile: {
    userId: number;
    nickname: string;
    avatarUrl: string;
    backgroundUrl: string;
    signature: string;  //个人简介

    // 性别
    gender: number;

    // 粉丝
    followeds: number;

    // 关注
    follows: number;

    // 动态
    eventCount: number;
  };
};


export interface RecordVal {
  playCount: number;
  score: number;
  song: Song;
}

type recordKeys = 'weekData' | 'allData';

export type UserRecord = {
  [key in recordKeys]: RecordVal[];
};

export interface UserSheet {
  self: SongSheet[];
  subscribed: SongSheet[];
};
