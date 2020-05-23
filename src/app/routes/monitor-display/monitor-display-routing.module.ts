import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorDisplayHomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: MonitorDisplayHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorDisplayRoutingModule { }
