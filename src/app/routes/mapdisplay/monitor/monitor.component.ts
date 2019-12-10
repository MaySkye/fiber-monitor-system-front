import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-mapdisplay-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
})
export class MapdisplayMonitorComponent implements OnInit {

  data: any = {};
  loading = true;

  constructor(private http: _HttpClient) {
  }

  ngOnInit() {
    // this.http.get('/chart').subscribe((res: any) => {
    //   res.offlineData.forEach((item: any, idx: number) => {
    //     item.show = idx === 0;
    //     item.chart = Object.assign([], res.offlineChartData);
    //   });
    //   // this.data = res;
    //   console.log('data', res.visitData);
    //
    //   // this.loading = false;
    //   // this.changeSaleType();
    // });
    this.data = [
       { x: '2019-07-17', y: 7 }
      , { x: '2019-07-18', y: 5 }
      , { x: '2019-07-19', y: 4 }
      , { x: '2019-07-20', y: 2 }
      , { x: '2019-07-21', y: 4 }
      , { x: '2019-07-22', y: 7 }
      , { x: '2019-07-23', y: 5 }
      , { x: '2019-07-24', y: 6 }
      , { x: '2019-07-25', y: 5 }
      , { x: '2019-07-26', y: 9 }
      , { x: '2019-07-27', y: 6 }
      , { x: '2019-07-28', y: 3 }
      , { x: '2019-07-29', y: 1 }
      , { x: '2019-07-30', y: 5 }
      , { x: '2019-07-31', y: 3 }
      , { x: '2019-08-01', y: 6 }
      , { x: '2019-08-02', y: 5 }];
  }

}
