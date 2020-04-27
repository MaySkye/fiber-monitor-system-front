import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorDisplayHomeComponent } from './home/home.component';
import { MonitorDisplayHomeWidgetSettingComponent } from './home/widget/widget-setting/widget-setting.component';

const routes: Routes = [
  { path: 'home', component: MonitorDisplayHomeComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorDisplayRoutingModule { }
