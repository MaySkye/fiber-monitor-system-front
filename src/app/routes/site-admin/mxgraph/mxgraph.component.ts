import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';


@Component({
  selector: 'app-site-admin-mxgraph',
  templateUrl: './mxgraph.component.html',
})
export class SiteAdminMxgraphComponent implements OnInit {

  constructor(private http: _HttpClient) {
  }


  ngOnInit() {
    // 每次渲染时，这段函数都会执行

    let mxGraphRoot = 'http://localhost:8080/javascript/examples/grapheditor/www/index.html';
    // 检查由表格跳转的url是否携带参数,若不携带则定位到起始页
    if (window.location.href.indexOf('?') == -1) {
      document.getElementById('mxgraph')["src"] = mxGraphRoot;
      return;
    }
    // 若携带参数，则获取站点参数
    let params = window.location.href.substring(window.location.href.lastIndexOf('?'));
    /**
     * 在这里生成链接mxGraph的Url地址，需经过UrlDecode转码，防止中文乱码，请无视CLI控制台的报错
     * 请在mxGraph项目的action_ww.js中完善$(function(){})内的代码，以实现根据url显式参数打开某个组态图
     * url-demo: http://localhost:8080/javascript/examples/grapheditor/www/index.html?site_name=郑州&site_level=1
     */
    let targetMxGraphUrl = mxGraphRoot + decodeURIComponent(params);
    document.getElementById('mxgraph')["src"] = targetMxGraphUrl;
  }

}
