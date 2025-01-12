import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TrackDetailsComponent } from './features/track/track-details/track-details.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {TrackEffects} from "./store/track.effects";
import {trackReducer} from "./store/track.reducer";
import { HomeComponent } from './features/home/home.component';
import {TrackModule} from "./features/track/track.module";
import {TimeFormatPipe} from "./pipes/time-format.pipe";

@NgModule({
  declarations: [
    AppComponent,
    TrackDetailsComponent,
    HomeComponent,
    TimeFormatPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        FormsModule,
        SharedModule,
        StoreModule.forRoot({tracks: trackReducer}, {}),
        EffectsModule.forRoot([TrackEffects]),
        TrackModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
