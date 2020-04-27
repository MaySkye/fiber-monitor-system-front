import {Component, OnInit, Input, ElementRef} from '@angular/core';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'ww-mini-area',
  templateUrl: './ww-mini-area.component.html',
})
export class MonitorDisplayG2ChartWwEncapsulationsWwMiniAreaComponent implements OnInit {

  @Input("data") data;
  private watchInterval = 1000;  // 监听间隔ms

  private _chart;
  private _oriSize;

  constructor(private _ele: ElementRef) {
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
    that._chart = new G2.Chart({
      container: that._ele.nativeElement.firstChild,
      forceFit: true,
      height: that._ele.nativeElement.parentNode.offsetHeight,
      padding: ['2%', '0', '20%', '0']
    });
    that._chart.source(that.data);
    that._chart.scale({
      value: {
        min: 0
      },
      time: {
        type: 'time'
      }
    });
    that._chart.axis('value', {
      label: null,
      grid: null,
      tickLine: null
    }).axis('time', {
      label: null,
      grid: null,
      tickLine: null
    });
    that._chart.tooltip({
      'g2-tooltip': {
        position: 'absolute',
        visibility: 'hidden',
        border: '1px solid #efefef',
        backgroundColor: 'white',
        opacity: '0.8',
        color: 'black',
        padding: '3px 3px',
        transition: 'top 200ms,left 200ms',
        height: '24px',
        width: '200px',
        boxShadow: '0 0 5px black'
      }, // 设置 tooltip 的 css 样式
      'g2-tooltip-title': {
        margin: '0',
        lineHeight: '18px'
      },
      'g2-tooltip-list': {
        margin: '0',
        lineHeight: '18px'
      },
      containerTpl: '<div class="g2-tooltip">'
        + '<span style="background-color:#188FFF; width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:4px;"></span>'
        + '日期：<div class="g2-tooltip-title" style="display: inline-block;"></div>'
        + '<ul class="g2-tooltip-list" style="float: right;"></ul>'
        + '</div>',
      itemTpl: '<li data-index={index}>' +
        '数目：{value}' +
        '</li>'
    });
    that._chart.area().position('time*value').shape('smooth');
    ;
    that._chart.line().position('time*value').size(2).shape('smooth');
    ;
    that._chart.render();
  }
}
