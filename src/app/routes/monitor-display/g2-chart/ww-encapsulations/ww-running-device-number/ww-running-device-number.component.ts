import {Component, ElementRef, OnInit, Input} from '@angular/core';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'ww-running-device-number',
  templateUrl: './ww-running-device-number.component.html',
})
export class MonitorDisplayG2ChartWwEncapsulationsWwRunningDeviceNumberComponent implements OnInit {


  private watchInterval = 1000;  // 监听间隔ms
  private _chart;
  private _oriSize;

  constructor(private http: _HttpClient, private _ele: ElementRef) {
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
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
        that.render()
      }
    }, that.watchInterval);
  }

  render() {
    let that = this;
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

    that._chart = new G2.Chart({
      container: that._ele.nativeElement.firstChild,
      forceFit: true,
      height: that._ele.nativeElement.parentNode.offsetHeight,
      padding: 'auto',
    });
    that._chart.source(data);
    that._chart.tooltip({
      containerTpl: '<div class="g2-tooltip">'
        + '<div class="g2-tooltip-title" style="margin:10px 0;"></div>'
        + '<ul class="g2-tooltip-list"></ul></div>', // tooltip 容器模板
      itemTpl: '<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{name}: {value}</li>', // tooltip 每项记录的默认模板
      inPlot: true, // 将 tooltip 展示在指定区域内
    });
    that._chart.scale('value', {
      alias: '正在运行设备数量',
      max: 75,
      min: 0,
      tickCount: 4,
    });
    that._chart.axis('type', {
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

    that._chart.axis('value', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
      },
      title: {
        offset: 50,
      },
    });
    that._chart.legend({
      position: 'top-center',
    });
    that._chart.interval().position('type*value').color('company').opacity(1).adjust([{
      type: 'dodge',
      marginRatio: 1 / 32,
    }]);
    that._chart.render();
  }
}
