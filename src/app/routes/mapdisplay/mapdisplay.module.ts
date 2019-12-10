import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MapdisplayRoutingModule } from './mapdisplay-routing.module';
import { MapdisplayMapviewComponent } from './mapview/mapview.component';
import { HttpClientModule } from '@angular/common/http';
import { MapdisplayMapDemo3Component } from './map-demo3/map-demo3.component';
import { MapdisplayMainLineComponent } from './main-line/main-line.component';
import { MapdisplayMainPieDataComponent } from './main-pie-data/main-pie-data.component';
import { DelonChartModule } from '@delon/chart';
import { MapdisplayMainBarDataComponent } from './main-bar-data/main-bar-data.component';
import { MapdisplayMainTimeLineDataComponent } from './main-time-line-data/main-time-line-data.component';
import { MapdisplayMonitorComponent } from './monitor/monitor.component';
import { BaiduMapModule } from 'angular2-baidu-map';
import { MapdisplayHeatMapViewComponent } from './heat-map-view/heat-map-view.component';
import { MapdisplayStructureDiagramComponent } from './structure-diagram/structure-diagram.component';
import { MapdisplayCdkdragDemoComponent } from './cdkdrag-demo/cdkdrag-demo.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


const COMPONENTS = [
  MapdisplayMapviewComponent,
  MapdisplayMapDemo3Component,
  MapdisplayMainLineComponent,
  MapdisplayMainPieDataComponent,
  MapdisplayMainBarDataComponent,
  MapdisplayMainTimeLineDataComponent,
  MapdisplayMonitorComponent,
  MapdisplayHeatMapViewComponent,
  MapdisplayStructureDiagramComponent,
  MapdisplayCdkdragDemoComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    MapdisplayRoutingModule,
    HttpClientModule,
    DelonChartModule, // Denlon 的图表模块
    BaiduMapModule.forRoot({ ak: 'zxNTayBLftAdnCLFKG8QRupU3RNFwvj2' }), // 百度地图用到的模块
    DragDropModule, // 拖拽模块
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class MapdisplayModule {
}
