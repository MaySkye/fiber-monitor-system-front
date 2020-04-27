import { Component, ElementRef, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-mapdisplay-main-bar-data',
  templateUrl: './main-bar-data.component.html',
  styleUrls: ['./main-bar-data.component.less'],
})
export class MapdisplayMainBarDataComponent implements OnInit {

  constructor(private http: _HttpClient) {
  }

  ngOnInit() {
  }

  render(el: ElementRef<any>) {
    // 柱状图
    const data = [{
      company: '光频分系统',
      type: '北京',
      value: 30,
    }, {
      company: '时间分系统',
      type: '北京',
      value: 35,
    }, {
      company: '微波分系统',
      type: '北京',
      value: 28,
    }, {
      company: '光频分系统',
      type: '西安',
      value: 40,
    }, {
      company: '时间分系统',
      type: '西安',
      value: 65,
    }, {
      company: '微波分系统',
      type: '西安',
      value: 47,
    }, {
      company: '光频分系统',
      type: '合肥',
      value: 23,
    }, {
      company: '时间分系统',
      type: '合肥',
      value: 18,
    }, {
      company: '微波分系统',
      type: '合肥',
      value: 20,
    }];

    const chart = new G2.Chart({
      container: el.nativeElement,
      forceFit: true,
      // height: window.innerHeight,
      padding: 'auto',
    });
    chart.source(data);
    chart.scale('value', {
      alias: '正在运行设备数量',
      max: 75,
      min: 0,
      tickCount: 4,
    });
    chart.axis('type', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
      },
      tickLine: {
        alignWithLabel: false,
        length: 0,
      },
    });
    chart.axis('value', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
      },
      title: {
        offset: 50,
      },
    });
    chart.legend({
      position: 'top-center',
    });
    chart.interval().position('type*value').color('company').opacity(1).adjust([{
      type: 'dodge',
      marginRatio: 1 / 32,
    }]);
    chart.render();
  }
}
