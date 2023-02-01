/*
 * @Author: cwj
 * @Date: 2023-02-01 19:37:04
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-02 00:02:29
 * @Introduce: 
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { SongSheet } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-sheet-info',
  templateUrl: './sheet-info.component.html',
  styleUrls: ['./sheet-info.component.less']
})
export class SheetInfoComponent implements OnInit {

  sheetInfo: SongSheet;

  // 歌单描述
  description = {
    short: '',
    long: ''
  }

  // 动态展开
  controlDesc = {
    isExpand: false, //是否展开
    label: '展开',  //文字
    iconCls: 'down' //图标类型
  }

  constructor(private route: ActivatedRoute,) {
    //route.data 是一个observable对象 包含了route的一些配置，
    //由于route.data包含了title,sheetInfo等多个信息，而我们只需要sheetInfo的数据，用map
    this.route.data.pipe(map(res => res['sheetInfo'])).subscribe(res => {
      this.sheetInfo = res;
      console.log('res',res);
      if (res.description) {
        this.changeDesc(res.description)
      }
    });
  }

  ngOnInit(): void {
  }

  // 处理歌单描述
  private changeDesc(desc: string) {
    if (desc.length < 99) {
      this.description = {
        short: this.replaceBr('<b>介绍： </b>' + desc),
        long: ''
      }
    } else {
      this.description = {
        short: this.replaceBr('<b>介绍： </b>' + desc.slice(0, 99)) + '...',
        long: this.replaceBr('<b>介绍： </b>' + desc)
      }
    }
  }

  // 替换换行符为br标签
  private replaceBr(str: string): string {
    return str.replace(/\n/g, '<br />');
  }

  // 展开折叠
  toggleDesc() {
    this.controlDesc.isExpand = !this.controlDesc.isExpand;
    if (this.controlDesc.isExpand) {
      this.controlDesc.label = '收起';
      this.controlDesc.iconCls = 'up'
    } else {
      this.controlDesc.label = '展开';
      this.controlDesc.iconCls = 'down'
    }
  }

}
