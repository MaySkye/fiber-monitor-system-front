import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { error } from 'util';

@Component({
  selector: 'ww-time-service-site-info',
  templateUrl: './ww-time-service-site-info.component.html',
  styleUrls: ['./ww-time-service-site-info.component.less'],
})
export class MonitorDisplayWwTimeServiceSiteInfoComponent implements OnInit {

  constructor(private http: _HttpClient) {
  }

  runtime: string; // 运行时间
  siteWorkNumber: object = { value: 0, style: '' };  // 站点正常运行数目
  siteErrorRate: object = { value: 0, style: '' };

  ngOnInit() {
    this.updateWorkingSiteNumber(426);
    this.calculateRuntime('2020-01-01 00:00:00');
    setInterval(() => {
      this.calculateRuntime('2020-01-01 00:00:00');
    }, 1000);
    setInterval(() => {
      this.updateWorkingSiteNumber(426);
    }, 3000);
  }


  calculateRuntime(from): void {
    // 首末时间
    from = new Date(from);
    let now: any = new Date();
    // 计算毫秒差值
    let secondSpan = (now - from) / 1000;
    // 计算天跨度
    let daySpan = Math.floor(secondSpan / (24 * 3600));
    // 计算小时跨度
    let leave1 = secondSpan % (24 * 3600);
    let hourSpan = Math.floor(leave1 / 3600);
    // 计算分钟跨度
    let leave2 = leave1 % 3600;
    let minSpan = Math.floor(leave2 / 60);
    // 计算秒跨度
    let secSpan = Math.trunc(leave2 % 60);
    this.runtime = (`${daySpan}天 ${hourSpan}小时 ${minSpan}分钟 ${secSpan}秒`);
  };

  updateWorkingSiteNumber(total: number): void {
    let dValue = Math.trunc(Math.random() * 5);
    let curNum = total - dValue;
    this.siteWorkNumber['value'] = curNum;
    this.siteErrorRate['value'] = (dValue / total * 100).toFixed(2) + '%';
    this.siteWorkNumber['style'] =  this.siteErrorRate['style'] = 'green';
  }

}
