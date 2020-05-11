import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteAdminSiteListComponent } from './site-list/site-list.component';
import { SiteAdminMxgraphComponent } from './mxgraph/mxgraph.component';
import { SiteAdminSitetoolComponent } from './sitetool/sitetool.component';
import { SiteAdminMapcontrolComponent } from './mapcontrol/mapcontrol.component';
import { SiteAdminServiceListComponent } from './service-list/service-list.component';
import { SiteAdminSitelineListComponent } from './siteline-list/siteline-list.component';

const routes: Routes = [

  { path: 'AllSiteList', component: SiteAdminSiteListComponent },
  { path: 'SiteListLevel1', component: SiteAdminSiteListComponent },
  { path: 'SiteListLevel2', component: SiteAdminSiteListComponent },
  { path: 'SiteListLevel3', component: SiteAdminSiteListComponent },
  { path: 'mxgraph', component: SiteAdminMxgraphComponent },
  { path: 'sitetool', component: SiteAdminSitetoolComponent },
  { path: 'mapcontrol', component: SiteAdminMapcontrolComponent },
  { path: 'service-list', component: SiteAdminServiceListComponent },
  { path: 'siteline-list', component: SiteAdminSitelineListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteAdminRoutingModule { }
