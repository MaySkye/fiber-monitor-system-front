import { Component, ElementRef, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'ww-centralized-fault-warning',
  templateUrl: './centralized-fault-warning.component.html',
})
export class MonitorDisplayG2ChartWwEncapsulationsCentralizedFaultWarningComponent implements OnInit {


  private watchInterval = 1000;  // 监听间隔ms

  private _chart;
  private _oriSize;

  constructor(private http: _HttpClient, private _ele:ElementRef) {
  }

  ngOnInit() {
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

    that._chart = new G2.Chart({
      container: that._ele.nativeElement.firstChild,
      padding: ['2%','30%','2%','10%'],
      height: that._ele.nativeElement.parentNode.offsetHeight,
      width: that._ele.nativeElement.parentNode.offsetWidth,
      forceFit:false
    });
    that._chart.source(data);
    that._chart.axis(false);
    that._chart.coord('rect').transpose().scale(1, -1);
    // tslint:disable-next-line:max-line-length
    that._chart.intervalSymmetric().position('action*pv').shape('pyramid').color('action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF']).label('action*pv', (action, pv) => {
      return action + ' ' + pv;
    }, {
      offset: 35,
      labelLine: {
        lineWidth: 1,
        stroke: 'rgba(0, 0, 0, 0.15)',
      },
    });
    that._chart.render();


  }
}
