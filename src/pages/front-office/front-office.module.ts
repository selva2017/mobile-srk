import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrontOfficePage } from './front-office';

@NgModule({
  declarations: [
    FrontOfficePage,
  ],
  imports: [
    IonicPageModule.forChild(FrontOfficePage),
  ],
})
export class FrontOfficePageModule {}
