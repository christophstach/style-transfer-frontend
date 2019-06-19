import { NgModule } from '@angular/core';

import { UploadRoutingModule } from './upload-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UploadComponent } from './components/upload/upload.component';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    SharedModule,
    UploadRoutingModule,
  ]
})
export class UploadModule {
}
