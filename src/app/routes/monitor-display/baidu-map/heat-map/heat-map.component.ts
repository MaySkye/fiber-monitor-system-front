import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

declare var BMap: any;

import { BHeatmap, HeatmapData, HeatmapOptions, MapOptions } from 'angular2-baidu-map';
import { HeatmapPoint } from 'angular2-baidu-map/types/Heatmap';

@Component({
  selector: 'app-baidu-heat-map',
  templateUrl: './heat-map.component.html',
})
export class MonitorDisplayBaiduMapHeatMapComponent implements OnInit {
  public opts: MapOptions;
  public data: HeatmapData = new class implements HeatmapData {
    data: Array<HeatmapPoint>;
    max: number;
  };
  public heatmapOptions: HeatmapOptions;


  constructor(private http: _HttpClient) {
    this.initMap();
  }

  ngOnInit(): void {
  }

  private initMap(){
    this.opts = {
      centerAndZoom: {     // 设置中心点和缩放级别
        lng: 108.94704,   // 经度
        lat: 37.347507,    // 纬度
        zoom: 4,           // 缩放级别
      },
      minZoom: 4,  // 最小缩放级别的地图
      maxZoom: 10, // 最大缩放级别的地图
      disableDragging: false, // 是否禁用地图拖动功能
      enableScrollWheelZoom: true, // 是否启用滚轮进行缩放功能
      enableMapClick: false, // 地图是否可以点击，default：true
    };
    // 构建数据
    this.data = {
      data: [{ lng: 108.94704, lat: 34.347507, count: 568 }, {
        lng: 116.416342,
        lat: 39.907645,
        count: 468,
      }, { lng: 117.235166, lat: 31.827805, count: 368 }, {
        lng: 114.31561,
        lat: 30.596726,
        count: 348,
      }, { lng: 121.477665, lat: 31.235682, count: 328 }, {
        lng: 125.330606,
        lat: 43.822579,
        count: 308,
      }, { lng: 109.518847, lat: 18.25956, count: 288 }, {
        lng: 76.000994,
        lat: 39.47788,
        count: 268,
      }, { lng: 123.437589, lat: 41.815608, count: 248 }, {
        lng: 87.629037,
        lat: 43.835757,
        count: 128,
      }, { lng: 98.500681, lat: 39.743794, count: 248 }, {
        lng: 102.838653,
        lat: 24.892879,
        count: 148,
      }, { lng: 108.378053, lat: 22.820475, count: 208 }, {
        lng: 118.096435,
        lat: 24.487513,
        count: 198,
      }, { lng: 120.711078, lat: 28.011292, count: 188 }, {
        lng: 113.636015,
        lat: 34.759134,
        count: 188,
      }, { lng: 117.126399, lat: 36.650995, count: 248 }, {
        lng: 93.521212,
        lat: 42.837674,
        count: 98,
      }, { lng: 126.541611, lat: 45.807215, count: 228 }, {
        lng: 103.845123,
        lat: 36.069102,
        count: 208,
      }, { lng: 106.553838, lat: 29.579048, count: 248 }, {
        lng: 112.551797,
        lat: 37.878813,
        count: 148,
      }, { lng: 104.076931, lat: 30.57825, count: 228 }, {
        lng: 110.360955,
        lat: 21.283191,
        count: 158,
      }, { lng: 118.793223, lat: 32.062694, count: 248 }, {
        lng: 107.239973,
        lat: 34.37845,
        count: 148,
      }, { lng: 113.276028, lat: 23.137463, count: 248 }], max: 600,
    };

    // this.createData();
    this.heatmapOptions = {
      visible: true,
    };
  }

  public heatmapLoaded(heatmap: any): void {
    // BHeatmap
    setTimeout(()=>{
      heatmap._map.centerAndZoom(new BMap.Point(108.94704, 37.347507), 4);
    },1000);
    console.log('heatmap loaded', heatmap);
  }

  // 构建数据
  private createData() {
    this.http.get('assets/json/site_info.json').subscribe(val => {
      if (val.length <= 0) {
        return;
      }
      const array = [];
      for (const i of val) {
        array.push({ lng: i.longitude, lat: i.Latitude, count: i.count });
      }
      this.data.data = [...array];
      // data是热力图的详细数据,count是权重值，max:{Number}权重的最大值
      this.data.max = 600;
    });
  }
}
