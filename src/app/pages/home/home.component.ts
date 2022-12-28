/*
 * @Author: cwj
 * @Date: 2022-12-09 21:25:06
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-22 22:21:30
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
import { Store } from '@ngrx/store';
import { AppStoreModule } from 'src/app/store';
import { SetCurrentIndex, SetPlayList, SetSongList } from 'src/app/store/actions/player.action';

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
    // this.getBanners();
    // this.getHotTags();
    // this.getPersonalSheetList(); 
    // this.getEnterSinger();
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
      this.store$.dispatch(SetSongList({ songList: list.slice(0,3) }));
      this.store$.dispatch(SetPlayList({ playList: list.slice(0,3) }));
      this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }));

    })
  }

}
