import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteAdminSiteListComponent } from './site-list/site-list.component';
import { SiteAdminMxgraphComponent } from './mxgraph/mxgraph.component';

const routes: Routes = [

  { path: 'AllSiteList', component: SiteAdminSiteListComponent },
  { path: 'SiteListLevel1', component: SiteAdminSiteListComponent },
  { path: 'SiteListLevel2', component: SiteAdminSiteListComponent },
  { path: 'SiteListLevel3', component: SiteAdminSiteListComponent },
  { path: 'mxgraph', component: SiteAdminMxgraphComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteAdminRoutingModule { }
