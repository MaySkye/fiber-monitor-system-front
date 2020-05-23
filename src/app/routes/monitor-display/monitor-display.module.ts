import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MonitorDisplayRoutingModule } from './monitor-display-routing.module';
import { DelonChartModule } from '@delon/chart';
/*  以下为人工引入  */
import { BaiduMapModule } from 'angular2-baidu-map';
import { MonitorDisplayBaiduMapHeatMapComponent } from './baidu-map/heat-map/heat-map.component';
import { MonitorDisplayBaiduMapSiteDistributionComponent } from './baidu-map/site-distribution/site-distribution.component';
import { MonitorDisplayG2ChartWwEncapsulationsWwCardComponent } from './g2-chart/ww-encapsulations/ww-card/ww-card.component';
import { MonitorDisplayG2ChartWwEncapsulationsWwMiniAreaComponent } from './g2-chart/ww-encapsulations/ww-mini-area/ww-mini-area.component';
import { MonitorDisplayG2ChartWwEncapsulationsWwMiniBarComponent } from './g2-chart/ww-encapsulations/ww-mini-bar/ww-mini-bar.component';
import { MonitorDisplayG2ChartWwEncapsulationsWwRunningDeviceNumberComponent } from './g2-chart/ww-encapsulations/ww-running-device-number/ww-running-device-number.component';
import { MonitorDisplayG2ChartWwEncapsulationsWwMainWireStabilityComponent } from './g2-chart/ww-encapsulations/ww-main-wire-stability/ww-main-wire-stability.component';
import { MonitorDisplayG2ChartWwEncapsulationsCentralizedFaultWarningComponent } from './g2-chart/ww-encapsulations/centralized-fault-warning/centralized-fault-warning.component';
import { MonitorDisplayG2ChartWwEncapsulationsWwTransmissionQualityBoardComponent } from './g2-chart/ww-encapsulations/ww-transmission-quality-board/ww-transmission-quality-board.component';
import { MonitorDisplayHomeComponent } from './home/home.component';
import { MonitorDisplayHomeWidgetComponent } from './home/widget/widget.component';
import { MonitorDisplayMashupSettingComponent } from './home/mashup-setting/mashup-setting.component';
import { MonitorDisplayHomeFileViewerComponent } from './home/file-viewer/file-viewer.component';
import { MonitorDisplayHomeWidgetSettingComponent } from './home/widget/widget-setting/widget-setting.component';
import { MonitorDisplayWwTimeServiceSiteInfoComponent } from './g2-chart/ww-encapsulations/ww-time-service-site-info/ww-time-service-site-info.component';
import { MonitorDisplayVisitorNumberComponent } from './g2-chart/ww-encapsulations/visitor-number/visitor-number.component';
import { MonitorDisplaySiteMaintenanceCardComponent } from './g2-chart/ww-encapsulations/site-maintainance-card/site-maintenance-card.component';
import { MonitorDisplaySiteRadarComponent } from './g2-chart/ww-encapsulations/site-radar/site-radar.component';


const COMPONENTS = [
  MonitorDisplayBaiduMapHeatMapComponent,
  MonitorDisplayBaiduMapSiteDistributionComponent,
  MonitorDisplayG2ChartWwEncapsulationsWwCardComponent,
  MonitorDisplayG2ChartWwEncapsulationsWwMiniAreaComponent,
  MonitorDisplayG2ChartWwEncapsulationsWwMiniBarComponent,
  MonitorDisplayG2ChartWwEncapsulationsWwRunningDeviceNumberComponent,
  MonitorDisplayG2ChartWwEncapsulationsWwMainWireStabilityComponent,
  MonitorDisplayG2ChartWwEncapsulationsCentralizedFaultWarningComponent,
  MonitorDisplayG2ChartWwEncapsulationsWwTransmissionQualityBoardComponent,
  MonitorDisplayHomeComponent,
  MonitorDisplayHomeWidgetComponent,
  MonitorDisplayMashupSettingComponent,
  MonitorDisplayHomeFileViewerComponent,
  MonitorDisplayHomeWidgetSettingComponent,
  MonitorDisplayWwTimeServiceSiteInfoComponent,
  MonitorDisplayVisitorNumberComponent,
  MonitorDisplaySiteMaintenanceCardComponent,
  MonitorDisplaySiteRadarComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    MonitorDisplayRoutingModule,
    DelonChartModule,
    BaiduMapModule.forRoot({ ak: 'zxNTayBLftAdnCLFKG8QRupU3RNFwvj2' }), // 百度地图用到的模块
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class MonitorDisplayModule { }
