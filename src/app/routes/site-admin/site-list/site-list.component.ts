import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-site-admin-site-list',
  templateUrl: './site-list.component.html',
})
export class SiteAdminSiteListComponent implements OnInit {
  // url = `/fiber/site/level-list`;
  //url = '/fiber/site?level=' + location.href.substring(location.href.lastIndexOf('level=') + 6);
  url=environment.SERVER_URL+'site/findsiteinfo/'+location.href.substring(location.href.lastIndexOf('level=') + 6);
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '站点名称',
      },
    },
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    // {index: 'id'},
    { title: '站点名称', index: 'site_name' },
    { title: '经度', index: 'site_localx' },
    { title: '维度', index: 'site_localy' },
    { title: '站点级别', index: 'site_level' },
    { title: '站点类型', index: 'site_type' },
    {
      title: '动作',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
        {
          text: '查看监控图',
          type: 'link',
          click:function(data) {
            window.location.assign("#/site-admin/mxgraph?sitename=" + data.site_name + "&sitelevel=" + data.site_level);
            /*window.open('http://localhost:8080/javascript/examples/grapheditor/www/index.html?sitename='
              +data.name+"&sitelevel="+data.level);*/
          }
        },
        {
          text: '查看信息',
          type: 'link',
          click:function(data) {
            //window.location.assign("#/site-admin/mxgraph?sitename=" + data.site_name + "&sitelevel=" + data.site_level);
          }
        },
        {
          text: '删除',
          type: 'link',
          click:function(data) {
            //window.location.assign("#/site-admin/mxgraph?sitename=" + data.name + "&sitelevel=" + data.site_level);
          }
        },
      ],
    },
  ];

  constructor(private http: _HttpClient, public http1: HttpClient, private router: Router) {}

  ngOnInit() {

  }
  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}


