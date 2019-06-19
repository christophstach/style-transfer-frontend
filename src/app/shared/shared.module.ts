import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbLayoutModule, NbPopoverModule, NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbThemeModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,

    NbThemeModule,
    NbSidebarModule,
    NbActionsModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbSpinnerModule,
    NbSelectModule,
    NbPopoverModule,

    WebcamModule
  ],
  exports: [
    CommonModule,
    RouterModule,

    NbThemeModule,
    NbSidebarModule,
    NbActionsModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbSpinnerModule,
    NbSelectModule,
    NbPopoverModule,

    WebcamModule
  ]
})
export class SharedModule {
}
