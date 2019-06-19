import { NgModule } from '@angular/core';

import { WebcamRoutingModule } from './webcam-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WebcamComponent } from './components/webcam/webcam.component';

@NgModule({
  declarations: [WebcamComponent],
  imports: [
    SharedModule,
    WebcamRoutingModule
  ]
})
export class WebcamModule {
}
