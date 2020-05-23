import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SiteAdminRoutingModule } from './site-admin-routing.module';
import { SiteAdminSiteListComponent } from './site-list/site-list.component';
import { SiteAdminMxgraphComponent } from './mxgraph/mxgraph.component';
import { SiteAdminSitetoolComponent } from './sitetool/sitetool.component';
import { SiteAdminMapcontrolComponent } from './mapcontrol/mapcontrol.component';
import { SiteAdminServiceListComponent } from './service-list/service-list.component';
import { SiteAdminSitelineListComponent } from './siteline-list/siteline-list.component';
import { SiteAdminSiteEditDialogComponent } from './site-list/site-edit-dialog/site-edit-dialog.component';
import { SiteAdminSitelineEditDialogComponent } from './siteline-list/siteline-edit-dialog/siteline-edit-dialog.component';


const COMPONENTS = [
  SiteAdminSiteListComponent,
  SiteAdminMxgraphComponent,
  SiteAdminSitetoolComponent,
  SiteAdminMapcontrolComponent,
  SiteAdminServiceListComponent,
  SiteAdminSitelineListComponent,
  ];
const COMPONENTS_NOROUNT = [
  
  SiteAdminSiteEditDialogComponent,
  SiteAdminSitelineEditDialogComponent];

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
