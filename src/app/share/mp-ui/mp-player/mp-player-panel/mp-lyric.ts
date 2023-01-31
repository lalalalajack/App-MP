/*
 * @Author: cwj
 * @Date: 2023-01-18 23:55:16
 * @LastEditors: cwj
 * @LastEditTime: 2023-01-21 12:12:44
 * @Introduce: 歌词解析类
 */
import Base from "@better-scroll/core/dist/types/animater/Base";
import { Observable, Subject, Subscription, from, skip, timer, zip } from "rxjs";
import { Lyric } from "src/app/services/data-types/common.types";

//时间正则  
const timeExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export interface BaseLyricLine {
    txt: string;
    txtCn: string;
}

interface LyricLine extends BaseLyricLine {
    time: number;
}

interface Handler extends BaseLyricLine {
    lineNum: number;
}

//type LyricLine = {txt:string;txtCn:string;time:number};

export class MpLyric {
    private lrc: Lyric; //初始变量
    lines: LyricLine[] = [];    //返回变量
    private playing = false;    //播放状态，和mp-player与mp-player-panel的对应

    private curNum: number; //当前正在播放的歌词是第几行

    private startStamp: number; //时间戳
    private pauseStamp: number; //暂停的时候的时间戳
    private timer$: Subscription;
    handler = new Subject<Handler>();
    constructor(lrc: Lyric) {
        //console.log('lrc',lrc);
        this.lrc = lrc;
        this.init();
    }

    private init() {
        //双语歌词
        if (this.lrc.tlyric) {
            this.generTLyric();
        } else {
            this.generLyric();
        }
    }

    private generLyric() {
        const lines = this.lrc.lyric.split('\n');
        lines.forEach(line => this.makeLine(line));
        //console.log('lines',this.lines);
    }

    //把每一行的字符串提取出来需要的LyricLine对象
    private makeLine(line: string, tline = ''): void {
        //通过正则表达式
        const result = timeExp.exec(line);
        //console.log('resut:',result);
        if (result) {
            const txt = line.replace(timeExp, '').trim();
            const txtCn = tline ? tline.replace(timeExp, '').trim() : '';
            if (txt) {
                let thirdResult = result[3] || "000";
                //第三位数转为三位数
                const _thirdResult = thirdResult.length > 2 ? parseInt(thirdResult) : parseInt(thirdResult) * 10;
                const time = Number(result[1]) * 60 * 1000 + Number(result[2]) * 1000 + _thirdResult;
                this.lines.push({ txt, txtCn, time });
            }
        }
    }

    private generTLyric() {
        const lines = this.lrc.lyric.split('\n');
        //切割翻译后的歌词为行状态，再过滤掉多余的部分
        const tlines = this.lrc.tlyric.split('\n').filter(item => timeExp.exec(item) !== null);
        // console.log('lines:', lines);
        // console.log('tlines:', tlines);

        //计算双语行数差距
        const moreLine = lines.length - tlines.length;

        let tempArr = [];
        if (moreLine >= 0) {
            tempArr = [lines, tlines];
        } else {
            tempArr = [tlines, lines];
        }

        //对行数少的语言歌词的第一行进行正则，取匹配的结果，
        const first = timeExp.exec(tempArr[1][0])[0];
        console.log('first:', first);

        //用findIndex函数区配出符合的结果
        const skipIndex = tempArr[0].findIndex(item => {
            const exec = timeExp.exec(item);
            if (exec) {
                return exec[0] === first;
            } else {
                return -1;
            }
        });

        //获取跳过的下标
        const _skip = skipIndex === -1 ? 0 : skipIndex;
        //获取被跳过的部分
        const skipItems = tempArr[0].slice(0, _skip);
        if (skipItems.length) {
            skipItems.forEach((line: string) => this.makeLine(line))
        }

        let zipLines$: Observable<[string, string]>;
        if (moreLine > 0) {
            //rxjs内容:一一对应拼接
            zipLines$ = zip(from(lines).pipe(skip(_skip)), from(tlines));
        } {
            zipLines$ = zip(from(lines), from(tlines).pipe(skip(_skip)));
        }
        zipLines$.subscribe(([line, tline]) => this.makeLine(line, tline));
    }

    //歌词播放回调
    play(startTime = 0, skip = false) {

        if (!this.lines.length) { return };   //歌词不存在

        if (!this.playing) {    //开关按钮
            this.playing = true;
        }

        this.curNum = this.findCurNum(startTime);   //寻找startTime对应的歌词行数
        //console.log('curNum:', this.curNum);
        this.startStamp = Date.now() - startTime;

        if (!skip) {
            this.callHandler(this.curNum - 1);
        }

        if (this.curNum < this.lines.length) {  //如果当前歌词行数仍然小于总歌词行数，则保持歌词播放
            this.clearTimer();
            this.playReset();
        }
    }

    //持续播放歌词
    private playReset() {
        let line = this.lines[this.curNum];     //拿到当前正在播放的这一行的数据
        const delay = line.time - (Date.now() - this.startStamp);
        this.timer$ = timer(delay).subscribe(() => {
            this.callHandler(this.curNum++);
            if (this.curNum < this.lines.length && this.playing) {
                this.clearTimer();
                this.playReset();
            }
        })
    }

    private clearTimer(){
        this.timer$ && this.timer$.unsubscribe();
    }
    //把当前播放那一行歌词往外发射
    private callHandler(i: number) {
        if (i > 0) {
            this.handler.next({     //借助rxjs的操作符来发
                txt: this.lines[i].txt,
                txtCn: this.lines[i].txtCn,
                lineNum: i,
            });
        }

    }
    private findCurNum(startTime: number): number {     //根据时间戳来查找当前歌词所在行数
        const index = this.lines.findIndex(item => startTime <= item.time);
        return index === -1 ? this.lines.length - 1 : index;
    }

    //歌词播放
    togglePlay(playing: boolean) {
        const now = Date.now();     //先保存当前时间戳
        this.playing = playing;     //内外playing一致
        if (playing) {
            const startTime = (this.pauseStamp || now) - (this.startStamp || now);
            this.play(startTime, true);
        } else {
            this.stop();
            this.pauseStamp = now;
        }
    }
    //暂停只需要把计时器停掉
    stop() {
        if (this.playing) {
            this.playing = false;
        }
        this.clearTimer();
    }

    //拖动进度条
    seek(time: number) {
        this.play(time);
    }
} 