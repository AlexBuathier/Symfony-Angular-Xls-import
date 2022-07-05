import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './components/menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {FileImportComponent} from './components/file-import/file-import.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {CrudMusicGroupModalComponent} from './components/music-group-container/crud-music-group-modal/crud-music-group-modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MusicGroupContainerComponent } from './components/music-group-container/music-group-container.component';
import {
    MusicGroupTableComponent
} from './components/music-group-container/music-group-table/music-group-table.component';


@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        MusicGroupTableComponent,
        PageNotFoundComponent,
        HomePageComponent,
        FileImportComponent,
        CrudMusicGroupModalComponent,
        MusicGroupContainerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ModalModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
