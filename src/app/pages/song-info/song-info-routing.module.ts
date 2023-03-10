import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongInfoComponent } from './song-info.component';
import { SongInfoResolverService } from './song-info-resolver.service';

const routes: Routes = [{
  path: 'songInfo/:id', component: SongInfoComponent, data: { title: '歌曲详情' }, resolve: { songInfo: SongInfoResolverService }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[SongInfoResolverService]
})
export class SongInfoRoutingModule { }
