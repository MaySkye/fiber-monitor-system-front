import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema } from '@delon/form';
import { STColumn, STComponent } from '@delon/abc';

@Component({
  selector: 'app-site-admin-service-list',
  templateUrl: './service-list.component.html',
})
export class SiteAdminServiceListComponent implements OnInit {

  // url = `/fiber/site/level-list`;
  //url = '/fiber/site?level=' + location.href.substring(location.href.lastIndexOf('level=') + 6);
  url='http://localhost:8888/telemetry/getAllServiceInfo';
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '文件名称',
      },
    },
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '文件名称', index: 'file_name' },
    { title: '站点名称', index: 'site_name' },
    { title: '站点级别', index: 'site_level'},
    { title: '上传时间', index: 'upload_time'},
    {
      title: '动作',
      buttons: [
        {
          text: '查看监控图',
          type: 'link',
          click:function(data) {
            window.location.assign("#/site-admin/mxgraph?sitename=" + data.site_name + "&sitelevel=" + data.site_level);
          }
        },
        {
          text: '删除',
          type: 'link',
          click:function(data) {
            //window.location.assign("#/site-admin/mxgraph?sitename=" + data.name + "&sitelevel=" + data.level);
            /*window.open('http://localhost:8080/javascript/examples/grapheditor/www/index.html?sitename='
              +data.name+"&sitelevel="+data.level);*/
          }
        },
      ],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    //this.http.get(`/user/${this.id}`).subscribe(res => this.i = res);
  }
}
