import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-mapdisplay-main-line',
  templateUrl: './main-line.component.html',
  styleUrls: ['./main-line.component.less'],
})
export class MapdisplayMainLineComponent implements OnInit {

  public listOfData = [];
  private timer;

  constructor(private http: _HttpClient) {
  }

  ngOnInit() {

    // 获取页面数据
    this.http.get('assets/json/line_list.json').subscribe(data => {
      if (data.length === 0) {
        return;
      }
      // 构建定时器
      this.timer = setInterval(() => {
        const dataInfo = [];
        // 关系到引用传递的问题，所以必须这样复制,使用的es的结构表达式
        data.forEach(({ ...value }) => {
          dataInfo.push(value);
        });
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < dataInfo.length; i++) {
          const randomArray = this.createNum(dataInfo[i].fValue);
          dataInfo[i].status = randomArray[0].toString();
          dataInfo[i].fValue = randomArray[1];
        }
        this.listOfData = dataInfo;
      }, 2000);
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    console.log('销毁组件');
    // 销毁组件时清除定时器
    clearInterval(this.timer);
  }
  // 创建随机生成数值方法
  private createNum(str) {
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const a = Number(str.substr(0, 5)) + randomInt(0, 9999) / 10000;
    const b = Number(str.substr(-2)) + randomInt(1, 3);
    const str2 = a.toFixed(4) + 'E-' + b;
    return [randomInt(1, 3), str2];
  }
}
