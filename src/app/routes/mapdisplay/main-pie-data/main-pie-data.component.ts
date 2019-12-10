import { Component, ElementRef, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-mapdisplay-main-pie-data',
  templateUrl: './main-pie-data.component.html',
})
export class MapdisplayMainPieDataComponent implements OnInit {

  constructor(private http: _HttpClient) {
  }

  ngOnInit() {
  }

  render(el: ElementRef<any>) {

    const data = [{
      action: '全量告警',
      pv: 80,
    }, {
      action: '标准化告警',
      pv: 60,
    }, {
      action: '非工程化告警',
      pv: 40,
    }, {
      action: '派单告警',
      pv: 20,
    }];

    const chart = new G2.Chart({
      container: el.nativeElement,
      forceFit: true,
      // height: 500,
      padding: [20, 120, 95],
    });
    chart.source(data);
    chart.axis(false);
    chart.coord('rect').transpose().scale(1, -1);
    // tslint:disable-next-line:max-line-length
    chart.intervalSymmetric().position('action*pv').shape('pyramid').color('action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF']).label('action*pv', (action, pv) => {
      return action + ' ' + pv;
    }, {
      offset: 35,
      labelLine: {
        lineWidth: 1,
        stroke: 'rgba(0, 0, 0, 0.15)',
      },
    });
    chart.render();


  }
}
