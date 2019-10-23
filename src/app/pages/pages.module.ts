import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { SecurityComponent } from './components/security/security.component';
import { AboutComponent } from './components/about/about.component';


@NgModule({
  declarations: [TermsComponent, PrivacyComponent, SecurityComponent, AboutComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
