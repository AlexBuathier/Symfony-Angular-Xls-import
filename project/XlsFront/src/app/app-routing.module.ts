import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MusicGroupContainerComponent} from './components/music-group-container/music-group-container.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'music-group', component: MusicGroupContainerComponent },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
