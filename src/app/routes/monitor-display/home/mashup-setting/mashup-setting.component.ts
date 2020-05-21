import {Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import { WwCommonService } from '@shared/mxgraph/ww-common-service';

@Component({
  selector: 'ww-mashup-setting',
  templateUrl: './mashup-setting.component.html',
})
export class MonitorDisplayMashupSettingComponent implements OnInit {

  constructor(private http: _HttpClient, private wwCommonService: WwCommonService) {
  }

  ngOnInit() {
  }

  @Input("transitionDuration") public _transitionDuration;
  @Input("margin") public _margin;
  @Input("unit") public _unit;
  @Input("newDimension") public _newDimension;
  @Input("alwaysMax") public _alwaysMax;
  public _mashupWidgetTheme = 'theme-title-blue';

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

  public applyMashupSetting() {
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
    // 主题变化
    this.wwCommonService.changeMashupWidgetTheme(this._mashupWidgetTheme);
    // 关闭菜单
    this.toggleSettingWindow();
  }


}
