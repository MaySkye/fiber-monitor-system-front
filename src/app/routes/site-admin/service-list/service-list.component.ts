import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema } from '@delon/form';
import { STColumn, STComponent } from '@delon/abc';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-site-admin-service-list',
  templateUrl: './service-list.component.html',
})
export class SiteAdminServiceListComponent implements OnInit {

  // url = `/fiber/site/level-list`;
  //url = '/fiber/site?level=' + location.href.substring(location.href.lastIndexOf('level=') + 6);
  url=environment.SERVER_URL+'mongo/getAllServiceInfo';
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
            //window.location.assign("#/site-admin/mxgraph?fileId=" + data.site_name + "&sitelevel=" + data.site_level);
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

  constructor(private http: _HttpClient, public http1: HttpClient, private router: Router) {}

  ngOnInit(): void {
    //this.http.get(`/user/${this.id}`).subscribe(res => this.i = res);
  }
}
