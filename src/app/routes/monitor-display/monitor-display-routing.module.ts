import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorDisplayHomeComponent } from './home/home.component';
import { MonitorDisplayHomeWidgetSettingComponent } from './home/widget/widget-setting/widget-setting.component';
import { MonitorDisplayWwTimeServiceSiteInfoComponent } from './g2-chart/ww-encapsulations/ww-time-service-site-info/ww-time-service-site-info.component';
import { MonitorDisplayVisitorNumberComponent } from './g2-chart/ww-encapsulations/visitor-number/visitor-number.component';

const routes: Routes = [
  { path: 'home', component: MonitorDisplayHomeComponent }
  ,
  { path: 'ww-time-service-site-info', component: MonitorDisplayWwTimeServiceSiteInfoComponent },
  { path: 'visitor-number', component: MonitorDisplayVisitorNumberComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorDisplayRoutingModule { }
