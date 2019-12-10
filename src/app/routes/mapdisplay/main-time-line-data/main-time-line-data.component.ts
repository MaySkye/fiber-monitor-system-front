import { Component, ElementRef, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-mapdisplay-main-time-line-data',
  templateUrl: './main-time-line-data.component.html',
  styleUrls: ['./main-time-line-data.component.less'],
})
export class MapdisplayMainTimeLineDataComponent implements OnInit {

  chartData: any[] = [];

  constructor(private http: _HttpClient) {
  }

  ngOnInit(): void {
  }

  render(el: ElementRef<any>) {
    // 自定义多折线图
    const data = [{
      date: '2018/01',
      type: '光纤光频传递分系统',
      value: 70,
    }, {
      date: '2018/01',
      type: '光纤时间同步分系统',
      value: 80,
    }, {
      date: '2018/01',
      type: '光纤微波传递分系统',
      value: 87,
    }, {
      date: '2018/02',
      type: '光纤光频传递分系统',
      value: 80,
    }, {
      date: '2018/02',
      type: '光纤时间同步分系统',
      value: 84,
    }, {
      date: '2018/02',
      type: '光纤微波传递分系统',
      value: 85,
    }, {
      date: '2018/03',
      type: '光纤光频传递分系统',
      value: 81,
    }, {
      date: '2018/03',
      type: '光纤时间同步分系统',
      value: 84,
    }, {
      date: '2018/03',
      type: '光纤微波传递分系统',
      value: 92,
    }, {
      date: '2018/04',
      type: '光纤光频传递分系统',
      value: 85,
    }, {
      date: '2018/04',
      type: '光纤时间同步分系统',
      value: 79,
    }, {
      date: '2018/04',
      type: '光纤微波传递分系统',
      value: 93,
    }, {
      date: '2018/05',
      type: '光纤光频传递分系统',
      value: 79,
    }, {
      date: '2018/05',
      type: '光纤时间同步分系统',
      value: 82,
    }, {
      date: '2018/05',
      type: '光纤微波传递分系统',
      value: 84,
    }, {
      date: '2018/06',
      type: '光纤光频传递分系统',
      value: 75,
    }, {
      date: '2018/06',
      type: '光纤时间同步分系统',
      value: 70,
    }, {
      date: '2018/06',
      type: '光纤微波传递分系统',
      value: 80,
    }, {
      date: '2018/07',
      type: '光纤光频传递分系统',
      value: 83,
    }, {
      date: '2018/07',
      type: '光纤时间同步分系统',
      value: 67,
    }, {
      date: '2018/07',
      type: '光纤微波传递分系统',
      value: 76,
    }, {
      date: '2018/08',
      type: '光纤光频传递分系统',
      value: 87,
    }, {
      date: '2018/08',
      type: '光纤时间同步分系统',
      value: 84,
    }, {
      date: '2018/08',
      type: '光纤微波传递分系统',
      value: 85,
    }, {
      date: '2018/09',
      type: '光纤光频传递分系统',
      value: 90,
    }, {
      date: '2018/09',
      type: '光纤时间同步分系统',
      value: 86,
    }, {
      date: '2018/09',
      type: '光纤微波传递分系统',
      value: 84,
    }, {
      date: '2018/10',
      type: '光纤光频传递分系统',
      value: 91,
    }, {
      date: '2018/10',
      type: '光纤时间同步分系统',
      value: 80,
    }, {
      date: '2018/10',
      type: '光纤微波传递分系统',
      value: 83,
    }, {
      date: '2018/11',
      type: '光纤光频传递分系统',
      value: 70,
    }, {
      date: '2018/11',
      type: '光纤时间同步分系统',
      value: 92,
    }, {
      date: '2018/11',
      type: '光纤微波传递分系统',
      value: 78,
    }, {
      date: '2018/12',
      type: '光纤光频传递分系统',
      value: 88,
    }, {
      date: '2018/12',
      type: '光纤时间同步分系统',
      value: 73,
    }, {
      date: '2018/12',
      type: '光纤微波传递分系统',
      value: 81,
    },
    ];
    const chart = new G2.Chart({
      container: el.nativeElement,
      forceFit: true,
      // height: window.innerHeight,
      padding: [100, 20, 30, 45], // 上右下左
    });
    chart.source(data);
    chart.axis('date', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
      },
    });
    chart.axis('value', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
        formatter: function formatter(text) {
          return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        },
      },
    });
    chart.legend(false);
    chart.line().position('date*value').color('type');
    chart.render();
    chart.showTooltip({
      x: el.nativeElement.clientWidth - 20,
      y: 100,
    });
  }

}
