import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './webcam/webcam.module#WebcamModule'
  },
  {
    path: 'upload',
    pathMatch: 'full',
    loadChildren: './upload/upload.module#UploadModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
