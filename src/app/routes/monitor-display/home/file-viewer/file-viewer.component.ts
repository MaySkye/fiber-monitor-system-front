import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { _HttpClient } from '@delon/theme';
import { WwCommonService } from '@shared/mxgraph/ww-common-service';

@Component({
  selector: 'ww-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.less'],
})
export class MonitorDisplayHomeFileViewerComponent {

  private fontColor = 'black';
  private fontSize = '12px';

  @Input('fileViewerId') public fileViewerId; // 记录视图id
  @Input('file') private file;  // 文件
  @Input('mxGraphURL') private mxGraphURL = 'http://localhost:8080/javascript/examples/grapheditor/www/index.html';
  public type = 'x';  // 文件类型


  @ViewChild('mxGraph') private _mxGraphIframe: ElementRef;  // iframe
  @ViewChild('defaultSite') private _defaultSiteIframe: ElementRef;  // iframe
  private _reader = new FileReader();
  private _content;  // 文件内容
  private _refreshDelay;  // 组态图刷新延迟

  constructor(private http: _HttpClient,
              public _ele: ElementRef,
              private sanitizer: DomSanitizer,
              private mxGraphAuthService: WwCommonService) {
  }


  private load() {
    // image文件
    if (/image/.test(this.file.type)) {
      this.type = 'image';
      this._reader.readAsDataURL(this.file);
      let that = this;
      this._reader.onload = function() {
        that._content = that._reader.result;
      };
    }
    // txt文件
    else if (/text\/plain/.test(this.file.type)) {
      this.type = 'text';
      this._reader.readAsText(this.file);
      let that = this;
      this._reader.onload = function() {
        that._content = that._reader.result;
      };
      let size = '';
    }
    // html文件
    else if (/text\/html/.test(this.file.type)) {
      this.type = 'html';
      this._reader.readAsText(this.file);
      let that = this;
      this._reader.onload = function() {
        that._content = that._reader.result;
        that._content = that.sanitizer.bypassSecurityTrustHtml(that._content);
      };
    }
    // 视频文件
    else if (/video/.test(this.file.type)) {
      this.type = 'video';
      this._reader.readAsDataURL(this.file);
      let that = this;
      this._reader.onload = function() {
        that._content = that._reader.result;
      };
    }
    // .mxe组态图文件
    else if (/.*.mxe/.test(this.file.name)) {
      this.type = 'mxe-file';
      this._reader.readAsText(this.file);
      let that = this;
      this._reader.onload = ()=> {
        let message = {
          type: 'mxe-file',
          content: that._reader.result,
        };
        this.mxGraphAuthService.doHandleForMxGraph(that._mxGraphIframe.nativeElement);
        window.onmessage = (event)=>{
          if(event.data.type === 'loaded')
          {
            that._mxGraphIframe.nativeElement.contentWindow.postMessage(message, '*');
          }
        };
      };
    }
    else if(this.file.extra === 'default-mxe-file')
    {
      this.type = 'default-mxe-file';
      setTimeout(()=>{
        this.mxGraphAuthService.doHandleForMxGraph(this._defaultSiteIframe.nativeElement);
      },1000);
    }
    console.log(`The type is ${this.type}`);
  }


  // 提交参数
  public applyMxGraphArgs(params) {
    let that = this;
    let message = {
      type: 'setting',
      content: params,
    };
    this._mxGraphIframe.nativeElement.contentWindow.postMessage(message, '*');
  }

  public applyTextArgs(params) {
    params.fontColor ? this.fontColor = params.fontColor : false;
    params.fontSize ? this.fontSize = params.fontSize : false;
  }


  ngAfterViewInit() {
    this.load();
  }
}
