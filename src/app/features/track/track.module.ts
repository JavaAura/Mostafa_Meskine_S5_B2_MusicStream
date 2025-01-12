import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackRoutingModule } from './track-routing.module';
import { TrackComponent } from './track.component';
import { TrackFormComponent } from './track-form/track-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SafeUrlPipe} from "../../pipes/safe-url.pipe";


@NgModule({
  declarations: [
    TrackComponent,
    TrackFormComponent,
    SafeUrlPipe
  ],
  exports: [
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    TrackRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TrackModule { }
