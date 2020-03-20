import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SiteAdminRoutingModule } from './site-admin-routing.module';
import { SiteAdminSiteListComponent } from './site-list/site-list.component';
import { SiteAdminMxgraphComponent } from './mxgraph/mxgraph.component';
import { SiteAdminSitetoolComponent } from './sitetool/sitetool.component';
import { SiteAdminMapcontrolComponent } from './mapcontrol/mapcontrol.component';
import { SiteAdminServiceListComponent } from './service-list/service-list.component';

const COMPONENTS = [
  SiteAdminSiteListComponent,
  SiteAdminMxgraphComponent,
  SiteAdminSitetoolComponent,
  SiteAdminMapcontrolComponent,
  SiteAdminServiceListComponent];
const COMPONENTS_NOROUNT = [
  ];

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
