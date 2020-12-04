import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackResultPage } from './track-result.page';

const routes: Routes = [
  {
    path: '',
    component: TrackResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackResultPageRoutingModule {}
