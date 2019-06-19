import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbIconModule,
  NbLayoutModule, NbPopoverModule, NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbThemeModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,

    NbEvaIconsModule,
    NbIconModule,
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

    NbEvaIconsModule,
    NbThemeModule,
    NbIconModule,
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
