import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackRoutingModule } from './track-routing.module';
import { TrackComponent } from './track.component';
import { TrackFormComponent } from './track-form/track-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TrackComponent,
    TrackFormComponent
  ],
  imports: [
    CommonModule,
    TrackRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TrackModule { }
