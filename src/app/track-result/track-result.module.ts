import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackResultPageRoutingModule } from './track-result-routing.module';

import { TrackResultPage } from './track-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackResultPageRoutingModule
  ],
  declarations: [TrackResultPage]
})
export class TrackResultPageModule {}
