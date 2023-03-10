import { MemberService } from './../../services/member.service';
import { getUserId, getMember } from './../../store/selectors/member.selector';
import { User } from './../../services/data-types/member.types';
import { MemberBatchActionsService } from './../../store/member-batch-actions.service';
/*
 * @Author: cwj
 * @Date: 2022-12-09 21:25:06
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-17 01:43:33
 * @Introduce:
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Banner,
  HotTag,
  Singer,
  SongSheet,
} from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
// import { HomeService } from 'src/app/services/home.service';
// import { SingerService } from 'src/app/services/singer.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SheetService } from 'src/app/services/sheet.service';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from 'src/app/store';
import { BatchActionsService } from 'src/app/store/palyer-batch-actions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  carouselActiveIndex = 0;
  banners: Banner[];
  hotTags: HotTag[];
  songSheetsList: SongSheet[];
  singer: Singer[];
  user: User; // 暂存当前的用户信息

  //private playState:PlayState;

  @ViewChild(NzCarouselComponent, { static: true })
  private nzCarousel: NzCarouselComponent;

  constructor(
    // private homeServe: HomeService,
    // private singerServe: SingerService,
    private route: ActivatedRoute,
    private router: Router,
    private SheetService: SheetService,
    private batchAction: BatchActionsService,
    private memberBatchAction: MemberBatchActionsService,
    private store$: Store<AppStoreModule>,
    private memberServe: MemberService
  ) {
    //route.data 是一个observable对象 包含了route的一些配置，详情见home-routing.module.ts文件
    //由于routedata包含了data和resolve，而我们只需要resolve的数据，用map
    this.route.data
      .pipe(map((res) => res['homeDatas']))
      .subscribe(([banners, tags, sheets, singer]) => {
        this.banners = banners;
        this.hotTags = tags;
        this.songSheetsList = sheets;
        this.singer = singer;
      });

    this.store$.pipe(select(getMember), select(getUserId)).subscribe((id) => {
      console.log('id', id);
      if (id) {
        this.getUserDetail(id);
      } else {
        this.user = null;
      }
    });

    // this.getBanners();
    // this.getHotTags();
    // this.getPersonalSheetList();
    // this.getEnterSinger ();
  }

  private getUserDetail(id: string) {
    this.memberServe.getUserDetail(id).subscribe((user) => (this.user = user));
  }

  // getBanners() {
  //   this.homeServe.getBanners().subscribe(banners => {
  //     // console.log('banners:', banners);
  //     this.banners = banners;
  //   });
  // }
  // getHotTags() {
  //   this.homeServe.getHotTags().subscribe(tags => {
  //     // console.log('tags:', tags);
  //     this.hotTags = tags;
  //   });
  // }
  // getPersonalSheetList() {
  //   this.homeServe.getPersonalSheetList().subscribe(sheets => {
  //     // console.log('sheets:', sheets);
  //     this.songSheetsList = sheets;
  //   });
  // }

  // getEnterSinger() {
  //   this.singerServe.getEnterSinger().subscribe(singer => {
  //     // console.log('singer:', singer);
  //     this.singer = singer;
  //   });
  // }

  ngOnInit(): void {}

  onBeforeChange({ to }) {
    // console.log('to:', to);
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

  //获取歌单详情
  onPlaySheet(id: number) {
    console.log('id:', id);
    this.SheetService.playSheet(id).subscribe((list) => {
      //console.log("res",res);
      this.batchAction.selectPlayList({ list, index: 0 });
    });
  }

  //点击歌单dom跳转链接到歌单详情
  toInfo(id: number) {
    this.router.navigate(['/sheetInfo', id]);
  }

  //打开弹窗
  openModal() {
    this.memberBatchAction.controlModal(true);
  }
}
