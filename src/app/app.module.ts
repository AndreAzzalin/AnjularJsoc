import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {SidebarModule} from 'ng-sidebar';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';


import { WaypointComponent } from './waypoint/waypoint.component';


@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        WaypointComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SidebarModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
