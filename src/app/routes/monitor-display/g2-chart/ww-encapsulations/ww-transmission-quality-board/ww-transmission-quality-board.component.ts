import {Component, ElementRef, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'ww-transmission-quality-board',
  templateUrl: './ww-transmission-quality-board.component.html',
})
export class MonitorDisplayG2ChartWwEncapsulationsWwTransmissionQualityBoardComponent implements OnInit {

  chartData: any[] = [];

  private watchInterval = 1000;  // 监听间隔ms

  private _chart;
  private _oriSize;

  constructor(private http: _HttpClient,public _ele:ElementRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // 获取组件类指针
    let that = this;
    // 监听容器尺寸变化
    setInterval(function () {
      let newSize = ' ' + that._ele.nativeElement.parentNode.offsetWidth + that._ele.nativeElement.parentNode.offsetHeight;
      if (that._oriSize != newSize) {
        // 重新赋值新尺寸
        that._ele.nativeElement.parentNode.style.height = that._ele.nativeElement.parentNode.offsetHeight;
        that._ele.nativeElement.parentNode.style.width = that._ele.nativeElement.parentNode.offsetWidth;
        that._oriSize = newSize;
        // 销毁图表
        if (that._chart) {
          that._chart.destroy();
        }
        that.render();
      }
    }, that.watchInterval);
  }

  render() {
    let that = this;
    // 自定义多折线图
    const data = [{
      date: '2019/01',
      type: '光纤光频传递分系统',
      value: 70,
    }, {
      date: '2019/01',
      type: '光纤时间同步分系统',
      value: 80,
    }, {
      date: '2019/01',
      type: '光纤微波传递分系统',
      value: 87,
    }, {
      date: '2019/02',
      type: '光纤光频传递分系统',
      value: 80,
    }, {
      date: '2019/02',
      type: '光纤时间同步分系统',
      value: 84,
    }, {
      date: '2019/02',
      type: '光纤微波传递分系统',
      value: 85,
    }, {
      date: '2019/03',
      type: '光纤光频传递分系统',
      value: 81,
    }, {
      date: '2019/03',
      type: '光纤时间同步分系统',
      value: 84,
    }, {
      date: '2019/03',
      type: '光纤微波传递分系统',
      value: 92,
    }, {
      date: '2019/04',
      type: '光纤光频传递分系统',
      value: 85,
    }, {
      date: '2019/04',
      type: '光纤时间同步分系统',
      value: 79,
    }, {
      date: '2019/04',
      type: '光纤微波传递分系统',
      value: 93,
    }, {
      date: '2019/05',
      type: '光纤光频传递分系统',
      value: 79,
    }, {
      date: '2019/05',
      type: '光纤时间同步分系统',
      value: 82,
    }, {
      date: '2019/05',
      type: '光纤微波传递分系统',
      value: 84,
    }, {
      date: '2019/06',
      type: '光纤光频传递分系统',
      value: 75,
    }, {
      date: '2019/06',
      type: '光纤时间同步分系统',
      value: 70,
    }, {
      date: '2019/06',
      type: '光纤微波传递分系统',
      value: 80,
    }, {
      date: '2019/07',
      type: '光纤光频传递分系统',
      value: 83,
    }, {
      date: '2019/07',
      type: '光纤时间同步分系统',
      value: 67,
    }, {
      date: '2019/07',
      type: '光纤微波传递分系统',
      value: 76,
    }, {
      date: '2019/08',
      type: '光纤光频传递分系统',
      value: 87,
    }, {
      date: '2019/08',
      type: '光纤时间同步分系统',
      value: 84,
    }, {
      date: '2019/08',
      type: '光纤微波传递分系统',
      value: 85,
    }, {
      date: '2019/09',
      type: '光纤光频传递分系统',
      value: 90,
    }, {
      date: '2019/09',
      type: '光纤时间同步分系统',
      value: 86,
    }, {
      date: '2019/09',
      type: '光纤微波传递分系统',
      value: 84,
    }, {
      date: '2019/10',
      type: '光纤光频传递分系统',
      value: 91,
    }, {
      date: '2019/10',
      type: '光纤时间同步分系统',
      value: 80,
    }, {
      date: '2019/10',
      type: '光纤微波传递分系统',
      value: 83,
    }, {
      date: '2019/11',
      type: '光纤光频传递分系统',
      value: 70,
    }, {
      date: '2019/11',
      type: '光纤时间同步分系统',
      value: 92,
    }, {
      date: '2019/11',
      type: '光纤微波传递分系统',
      value: 78,
    }, {
      date: '2019/12',
      type: '光纤光频传递分系统',
      value: 88,
    }, {
      date: '2019/12',
      type: '光纤时间同步分系统',
      value: 73,
    }, {
      date: '2019/12',
      type: '光纤微波传递分系统',
      value: 81,
    },
    ];
    that._chart = new G2.Chart({
      container: that._ele.nativeElement.firstChild,
      width: that._ele.nativeElement.parentNode.offsetWidth,
      height: that._ele.nativeElement.parentNode.offsetHeight,
      padding: ['10%','5%','25%','10%'], // 上右下左
      forceFit: false
    });
    that._chart.source(data);
    that._chart.axis('date', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
      },
    });
    that._chart.axis('value', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
        formatter: function formatter(text) {
          return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        },
      },
    });
    that._chart.legend(false);
    that._chart.line().position('date*value').color('type');
    that._chart.render();
  }

}
