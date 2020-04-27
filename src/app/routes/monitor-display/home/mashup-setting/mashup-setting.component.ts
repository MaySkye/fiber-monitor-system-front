import {Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'ww-mashup-setting',
  templateUrl: './mashup-setting.component.html',
})
export class MonitorDisplayMashupSettingComponent implements OnInit {

  constructor(private http: _HttpClient) {
  }

  ngOnInit() {
  }

  @Input("transitionDuration") private _transitionDuration;
  @Input("margin") private _margin;
  @Input("unit") private _unit;
  @Input("newDimension") private _newDimension;
  @Input("alwaysMax") private _alwaysMax;

  @Output('applyArgs') private _outer = new EventEmitter();

  @ViewChild('settingWindow') private _settingWindow;


  /**
   * 设置菜单显示开关
   * @param height: 控制显示高度
   */
  public toggleSettingWindow(height = '160px', transitionDuration = this._transitionDuration, margin = this._margin, unit = this._unit, dimension = this._newDimension, alwaysMax = this._alwaysMax) {
    // 变更显示参数
    this._transitionDuration = transitionDuration;
    this._margin = margin;
    this._unit = unit;
    this._newDimension = dimension;
    this._alwaysMax = alwaysMax;
    if (this._settingWindow.nativeElement.style.height == '0px') {
      height = (height.search(/\d+.?\d+px/) != -1) ? height : '160px';
      this._settingWindow.nativeElement.style.height = height;
    } else {
      this._settingWindow.nativeElement.style.height = '0px';
    }
  }

  private applyMashupSetting() {
    let that = this;
    let args: object = {
      transitionDuration: that._transitionDuration > 1000 ? 1000 : this._transitionDuration,
      margin: that._margin,
      unit: that._unit,
      dimension: that._newDimension,
      alwaysMax: that._alwaysMax
    };
    // 向父组件传递参数
    this._outer.emit(args);
    // 关闭菜单
    this.toggleSettingWindow();
  }


}
