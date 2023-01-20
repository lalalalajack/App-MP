/*
 * @Author: cwj
 * @Date: 2023-01-18 23:55:16
 * @LastEditors: cwj
 * @LastEditTime: 2023-01-21 05:45:45
 * @Introduce: 歌词解析类
 */
import Base from "@better-scroll/core/dist/types/animater/Base";
import { Observable, from, skip, zip } from "rxjs";
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

//type LyricLine = {txt:string;txtCn:string;time:number};

export class MpLyric {
    private lrc: Lyric;
    lines: LyricLine[] = [];
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
            const txtCn = tline ?tline.replace(timeExp, '').trim():'';
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
        console.log('lines:', lines);
        console.log('tlines:', tlines);

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
            }else{
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
}