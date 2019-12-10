import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapdisplayMapviewComponent } from './mapview/mapview.component';
import { MapdisplayMapDemo3Component } from './map-demo3/map-demo3.component';
import { MapdisplayMainLineComponent } from './main-line/main-line.component';
import { MapdisplayMainPieDataComponent } from './main-pie-data/main-pie-data.component';
import { MapdisplayMainBarDataComponent } from './main-bar-data/main-bar-data.component';
import { MapdisplayMainTimeLineDataComponent } from './main-time-line-data/main-time-line-data.component';
import { MapdisplayMonitorComponent } from './monitor/monitor.component';
import { MapdisplayHeatMapViewComponent } from './heat-map-view/heat-map-view.component';
import { MapdisplayStructureDiagramComponent } from './structure-diagram/structure-diagram.component';
import { MapdisplayCdkdragDemoComponent } from './cdkdrag-demo/cdkdrag-demo.component';

const routes: Routes = [

  { path: 'mapview', component: MapdisplayMapviewComponent },
  { path: 'MapDemo3', component: MapdisplayMapDemo3Component },
  { path: 'MainLine', component: MapdisplayMainLineComponent },
  { path: 'MainPieData', component: MapdisplayMainPieDataComponent },
  { path: 'MainBarData', component: MapdisplayMainBarDataComponent },
  { path: 'MainTimeLineData', component: MapdisplayMainTimeLineDataComponent },
  { path: 'Monitor', component: MapdisplayMonitorComponent },
  { path: 'HeatMapView', component: MapdisplayHeatMapViewComponent },
  { path: 'StructureDiagram', component: MapdisplayStructureDiagramComponent, data: { title: '站点详情' } },
  { path: 'cdkdragDemo', component: MapdisplayCdkdragDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapdisplayRoutingModule {
}
