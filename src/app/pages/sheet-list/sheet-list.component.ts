/*
import { SheetParams } from 'src/app/services/sheet.service';
 * @Author: cwj
 * @Date: 2023-02-01 15:33:29
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-01 18:43:16
 * @Introduce: 
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SheetList } from 'src/app/services/data-types/common.types';
import { SheetParams, SheetService } from 'src/app/services/sheet.service';
import { BatchActionsService } from 'src/app/store/batch-actions.service';

@Component({
  selector: 'app-sheet-list',
  templateUrl: './sheet-list.component.html',
  styleUrls: ['./sheet-list.component.less']
})
export class SheetListComponent implements OnInit {
  // 获取歌单的参数
  listParams: SheetParams = {
    cat: '全部',
    order: 'hot',
    offset: 1,
    limit: 35
  }

  sheets: SheetList; // 歌单列表
  radioValue = 'new'; // 歌单标签

  constructor(
    private route: ActivatedRoute,
    private SheetServe: SheetService,
    private batchActionsServe: BatchActionsService
  ) {
    // 通过路由获取参数
    this.listParams.cat = this.route.snapshot.queryParamMap.get('cat') || '全部';
    this.getList();
  }

  ngOnInit(): void {
  }

  // 获取歌单列表
  private getList() {
    this.SheetServe.getSheets(this.listParams).subscribe(res => this.sheets = res);
  }

  // 播放
  onPlaySheet(id: number) {
    this.SheetServe.playSheet(id).subscribe(list => {
      this.batchActionsServe.selectPlayList({ list, index: 0 })
    })
  }

  // 更改最新和最热
  onRadioChange(order: 'new' | 'hot') {
    this.listParams.order = order;
    this.listParams.offset = 1;
    this.getList();
  }

  // 分页
  onPageChange(offset: number) {
    this.listParams.offset = offset;
    this.getList();
  }

}
