import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input} from '@angular/core';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'ww-widget-setting',
  templateUrl: './widget-setting.component.html',
  styleUrls: ['./widget-setting.component.less']
})
export class MonitorDisplayHomeWidgetSettingComponent implements OnInit {

  @Input("settingList") private settingList = [];  // 参数设置

  private errorColor = '#FF0000';
  private fontColor = 'black';
  private fontSize = '12';

  @ViewChild('settingView') private _settingView: ElementRef;  // mxGraphSetting
  @Input('refreshDelay') private refreshDelay;  // 刷新延时

  @Output("params") private _paramsEmitter = new EventEmitter();

  // mxGraphSetting开关
  public toggleSetting(height = '100px') {
    if (this._settingView.nativeElement.style.height != height) {
      this._settingView.nativeElement.style.height = height;
      this._settingView.nativeElement.style.width = "200px";
    } else {
      this._settingView.nativeElement.style.height = "0px";
      this._settingView.nativeElement.style.width = "0px";
    }
  }

  private emitParams() {
    let params = {};
    this.refreshDelay ? params['refreshDelay'] = this.refreshDelay : false;
    this.errorColor ? params['errorColor'] = this.errorColor : 'black';
    this.fontColor ? params['fontColor'] = this.fontColor : 'red';
    this.fontSize ? params['fontSize'] = this.fontSize + 'px' : '12px';
    this._paramsEmitter.emit(params);
    this.toggleSetting();
  }

  constructor(private http: _HttpClient) {
  }

  ngOnInit() {
  }
}
