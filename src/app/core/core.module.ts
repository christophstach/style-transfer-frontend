import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent],
  imports: [
    SharedModule
  ],
  exports: [LayoutComponent]
})
export class CoreModule {
}
