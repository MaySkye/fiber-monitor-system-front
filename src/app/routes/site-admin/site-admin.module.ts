import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SiteAdminRoutingModule } from './site-admin-routing.module';
import { SiteAdminSiteListComponent } from './site-list/site-list.component';
import { SiteAdminMxgraphComponent } from './mxgraph/mxgraph.component';
import { SiteAdminSitetoolComponent } from './sitetool/sitetool.component';

const COMPONENTS = [
  SiteAdminSiteListComponent,
  SiteAdminMxgraphComponent];
const COMPONENTS_NOROUNT = [
  
  SiteAdminSitetoolComponent];

@NgModule({
  imports: [
    SharedModule,
    SiteAdminRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SiteAdminModule {
}
