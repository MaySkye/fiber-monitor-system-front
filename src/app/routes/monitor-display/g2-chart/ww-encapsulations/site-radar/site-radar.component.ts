import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'ww-site-radar',
  templateUrl: './site-radar.component.html',
  styleUrls: ['./site-radar.component.less'],
})
export class MonitorDisplaySiteRadarComponent implements OnInit {

  @ViewChild('right') _right: ElementRef;

  constructor(private http: _HttpClient, public _ele: ElementRef) {
  }

  private watchInterval = 1000;  // 监听间隔ms

  private _chart;
  private _oriSize;
  private _animate: boolean = true;
  protected _data;
  public _scannerScale = 0.375;


  get recordTotal() {
    return this._data[4].value + this._data[5].value + this._data[2].value + this._data[3].value + this._data[0].value + this._data[1].value;
  }

  ngOnInit() {
    this._data = [
      { value: 0, type: '报警', name: '链路报警' },
      { value: 0, type: '报警', name: '站点报警' },
      { value: 0, type: '异常', name: '链路异常' },
      { value: 0, type: '异常', name: '站点异常' },
      { value: 0, type: '正常', name: '链路数据' },
      { value: 0, type: '正常', name: '站点数据' },
    ];
  }

  // 监听容器尺寸变化
  private onResize() {
    setInterval(() => {
      let newSize = ' ' + this._right.nativeElement.offsetWidth + this._right.nativeElement.offsetHeight;
      if (this._oriSize != newSize) {
        // 重加动画
        this._animate = true;
        // 重新赋值新尺寸
        this._right.nativeElement.style.height = this._right.nativeElement.offsetHeight;
        this._right.nativeElement.style.width = this._right.nativeElement.offsetWidth;
        this._oriSize = newSize;
        // 销毁图表
        if (this._chart) {
          this._chart.destroy();
        }
        this.render();
      }
    }, this.watchInterval);
  }

  private updateData() {
    // 更新数据
    setInterval(() => {
      this._data = [
        { value: Math.trunc(Math.random() * 200 + 300), type: '报警', name: '链路报警' },
        { value: Math.trunc(Math.random() * 200 + 400), type: '报警', name: '设备报警' },
        { value: Math.trunc(Math.random() * 600 + 300), type: '异常', name: '链路异常' },
        { value: Math.trunc(Math.random() * 600 + 400), type: '异常', name: '设备异常' },
        { value: Math.trunc(Math.random() * 1500 + 1500), type: '正常', name: '链路数据' },
        { value: Math.trunc(Math.random() * 1700 + 3000), type: '正常', name: '站点数据' },
      ];
      // 销毁图表
      if (this._chart) {
        this._chart.destroy();
      }
      this.render();
    }, 3000);
  }

  ngAfterViewInit() {
    this.onResize();
    this.updateData();
  }


  render() {
    const { DataView } = DataSet;
    // 通过 DataSet 计算百分比
    const dv = new DataView();
    dv.source(this._data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'percent',
    });
    this._chart = new G2.Chart({
      container: this._right.nativeElement,
      padding: 0,
      width: this._right.nativeElement.offsetWidth,
      height: this._right.nativeElement.offsetHeight,
      animate: this._animate,
    });
    this._chart.source(dv, {
      percent: {
        formatter: val => {
          val = (val * 100).toFixed(2) + '%';
          return val;
        },
      },
      type: {
        formatter: val => {
          return (val === '正常' || val==='异常' || val == '报警') ? val : '';
        },
      },
    });
    this._chart.coord('theta', {
      radius: 0.5,
    });
    this._chart.tooltip({
      showTitle: false,
    });
    this._chart.legend(false);
    this._chart.intervalStack()
      .position('percent')
      .color('name', ['#eb2f96', '#faad14', '#4ECB73'])
      .label('type', {
        offset: -3,
      })
      .tooltip('name*percent', (item, percent) => {
        percent = (percent * 100).toFixed(2) + '%';
        return {
          name: item,
          value: percent,
        };
      })
      .select(false)
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });

    const outterView = this._chart.view();
    const dv1 = new DataView();
    dv1.source(this._data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'name',
      as: 'percent',
    });
    outterView.source(dv1, {
      percent: {
        formatter: val => {
          val = (val * 100).toFixed(2) + '%';
          return val;
        },
      },
    });
    outterView.coord('theta', {
      innerRadius: 0.5 / 0.75,
      radius: 0.75,
    });
    outterView.intervalStack()
      .position('percent')
      .color('name', ['#F759AB', '#FF85C0', '#ffc53d', '#ffd666', '#9FE5AF', '#C4F6CD'])
      .label('name')
      .tooltip('name*percent', (item, percent) => {
        percent = (percent * 100).toFixed(2) + '%';
        return {
          name: item,
          value: percent,
        };
      })
      .select(false)
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });
    this._chart.render();
    this._animate = false;
  }
}
