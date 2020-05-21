import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { WwCommonService } from '@shared/mxgraph/ww-common-service';

@Component({
  selector: 'ww-home-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less'],
})
export class MonitorDisplayHomeWidgetComponent implements OnInit {


  @Input('data-begin') private begin;  // 组件起点，(x, y)在(0, 0)开始
  @Input('data-size') private size;  // 尺寸
  @Input('resize') private resize;  // 可重置大小标志
  @Input('settingList') private settingList;  // 展示设置
  @Input('_draggable') private draggable;
  @Input('fileViewerId') private fileViewerId;  // 文件信息对应在homeComponent中的id
  @Input('settingHeight') private settingHeight = '100px';

  @ContentChild('title') private _title;
  @ContentChild('content') private _content: TemplateRef<any>;
  @ContentChild('fileViewer') private _fileViewer: any;
  @ContentChild('mainWireStability') private _mainWireStability: any;

  private widgetTheme: string = 'theme-title-blue';


  @ViewChild('setting') private setting: any;

  @Output('close') private _outer = new EventEmitter();

  constructor(private http: _HttpClient, private _ele: ElementRef, public wwCommonService: WwCommonService) {
    // 监听主题变化
    this.wwCommonService.mashupWidgetTheme.subscribe((data) => {
      this.widgetTheme = data;
    });
  }


  private close() {
    // 关闭动画
    this.hide();
    // 发送关闭消息
    let that = this;
    let eventMsg: object = {
      fileViewerId: that.fileViewerId,
      begin: this._ele.nativeElement.dataset.begin,
      size: this._ele.nativeElement.dataset.size,
    };
    setTimeout(function() {
      that._outer.emit(eventMsg);
    }, 200);
  }

  ngOnInit() {
  }


  // 关闭动画
  private hide() {
    // 获取目标元素DOM
    let block: any = this._ele.nativeElement.getElementsByClassName('dragEle')[0];
    // 获取组件类指针
    let that = this;
    // 获取区域样式
    let style: any = block.style;
    // 设置200ms过渡
    style.transitionDuration = '200ms';
    // 长度、宽度（过渡）置零
    style.width = '0';
    style.height = '0';
  }


  // 应用设置
  private applyArgs(params) {
    if (this._fileViewer) {
      if (this._fileViewer.type == 'mxe-file') {
        this._fileViewer.applyMxGraphArgs(params);
      } else if (this._fileViewer.type == 'text') {
        this._fileViewer.applyTextArgs(params);
      }
    } else if (this._mainWireStability) {
      this._mainWireStability.applyArgs(params);
    }
  }
}
