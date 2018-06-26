import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GatePage } from './gate';

@NgModule({
  declarations: [
    GatePage,
  ],
  imports: [
    IonicPageModule.forChild(GatePage),
  ],
})
export class GatePageModule {}
