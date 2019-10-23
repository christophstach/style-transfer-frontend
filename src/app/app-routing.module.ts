import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'webcam'
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule)
  },
  {
    path: 'webcam',
    pathMatch: 'full',
    loadChildren:  () => import('./webcam/webcam.module').then(mod => mod.WebcamModule)
  },
  {
    path: 'upload',
    pathMatch: 'full',
    loadChildren:  () => import('./upload/upload.module').then(mod => mod.UploadModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
