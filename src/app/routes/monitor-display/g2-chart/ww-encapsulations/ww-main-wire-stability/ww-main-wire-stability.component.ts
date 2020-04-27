import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'ww-main-wire-stability',
  templateUrl: './ww-main-wire-stability.component.html',
  styleUrls: ['./ww-main-wire-stability.component.less']
})
export class MonitorDisplayG2ChartWwEncapsulationsWwMainWireStabilityComponent implements OnInit {
  public listOfData = [];


  private _dataInterval;  // 获取数据的定时器
  private refreshDelay = 2000;  // 刷新延时
  private errorColor = 'red';  // 故障颜色

  @ViewChild('mxGraphSetting') private _mxGraphSetting: ElementRef;  // mxGraphSetting
  constructor(private http: _HttpClient, private _ele: ElementRef) {
  }

  ngOnInit() {
    this.getCycleData();
  }

  // 获取数据
  private getCycleData() {
    clearInterval(this._dataInterval);
    // 获取页面数据
    this.http.get('assets/json/line_list.json').subscribe(data => {
      if (data.length === 0) {
        return;
      }
      // 构建定时器
      this._dataInterval = setInterval(() => {
        const dataInfo = [];
        // 关系到引用传递的问题，所以必须这样复制,使用的es的结构表达式
        data.forEach(({...value}) => {
          dataInfo.push(value);
        });
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < dataInfo.length; i++) {
          const randomArray = this.createNum(dataInfo[i].fValue);
          dataInfo[i].status = randomArray[0].toString();
          dataInfo[i].fValue = randomArray[1];
        }
        this.listOfData = dataInfo;
      }, this.refreshDelay);
    });
  }

  ngOnDestroy() {
    console.log('销毁组件');
    // 销毁组件时清除定时器
    clearInterval(this._dataInterval);
  }

  // 创建随机生成数值方法
  private createNum(str) {
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const a = Number(str.substr(0, 5)) + randomInt(0, 9999) / 10000;
    const b = Number(str.substr(-2)) + randomInt(1, 3);
    const str2 = a.toFixed(4) + 'E-' + b;
    return [randomInt(1, 3), str2];
  }


  // 提交参数
  public applyArgs(params) {
    params.refreshDelay ? this.refreshDelay = params.refreshDelay : false;
    this.errorColor = params.errorColor;
    this.getCycleData();
  }
}
