/*
 * @Author: cwj
 * @Date: 2022-12-09 21:25:06
 * @LastEditors: cwj
 * @LastEditTime: 2023-01-04 01:11:58
 * @Introduce: 
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Banner, HotTag, Singer, SongSheet } from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
// import { HomeService } from 'src/app/services/home.service';
// import { SingerService } from 'src/app/services/singer.service';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SheetService } from 'src/app/services/sheet.service';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from 'src/app/store';
import { SetCurrentIndex, SetPlayList, SetSongList } from 'src/app/store/actions/player.action';
import { PlayState } from 'src/app/store/reducers/player.reducer';
import { getPlayer } from 'src/app/store/selectors/player.selector';
import { findIndex, shuffle } from 'src/app/utils/array';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
  carouselActiveIndex = 0;
  banners: Banner[];
  hotTags: HotTag[];
  songSheetsList: SongSheet[];
  singer: Singer[];

  private playState:PlayState;

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

  constructor(
    // private homeServe: HomeService,
    // private singerServe: SingerService,
    private route: ActivatedRoute,
    private SheetService: SheetService,
    private store$: Store<AppStoreModule>
  ) {
    //route.data 是一个observable对象 包含了route的一些配置，详情见home-routing.module.ts文件
    //由于routedata包含了data和resolve，而我们只需要resolve的数据，用map
    this.route.data.pipe(map(res => res['homeDatas'])).subscribe(([banners, tags, sheets, singer]) => {
      // console.log("res:",res);
      this.banners = banners;
      this.hotTags = tags;
      this.songSheetsList = sheets;
      this.singer = singer;
    });

    this.store$.pipe(select(getPlayer)).subscribe(res=>this.playState=<PlayState>res);
    // this.getBanners();
    // this.getHotTags();
    // this.getPersonalSheetList(); 
    // this.getEnterSinger ();
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

  ngOnInit(): void {
  }

  onBeforeChange({ to }) {
    // console.log('to:', to);
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

  //获取歌单详情
  onPlaySheet(id: number) {
    console.log("id:", id);
    this.SheetService.playSheet(id).subscribe(list => {
      //console.log("res",res);
      this.store$.dispatch(SetSongList({ songList: list }));
      //首页初始化时先订阅当前播放信息，在点击播放歌单时判断当前播放模式是否为随机，是则打乱歌单数组，重新计算当前歌曲的索引。
      let trueIndex = 0, trueList = list.slice();
      if (this.playState.playMode.type === "random") {
          trueList = shuffle(list || []);
          trueIndex = findIndex(trueList, list[trueIndex]);
      }

      this.store$.dispatch(SetPlayList({ playList: trueList }));
      this.store$.dispatch(SetCurrentIndex({ currentIndex: trueIndex }));
    }) 
  }

}
