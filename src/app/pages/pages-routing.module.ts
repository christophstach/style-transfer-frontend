import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';



const routes: Routes = [
  {
    path: 'terms',
    pathMatch: 'full',
    component: TermsComponent
  },
  {
    path: 'privacy',
    pathMatch: 'full',
    component: PrivacyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
