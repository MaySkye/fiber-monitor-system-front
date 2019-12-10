import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';


@Component({
  selector: 'app-site-admin-site-list',
  templateUrl: './site-list.component.html',
})
export class SiteAdminSiteListComponent implements OnInit {
  // url = `/fiber/site/level-list`;
  url = '/fiber/site?level=' + location.href.substring(location.href.lastIndexOf('level=') + 6);
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
    { title: '站点名称', index: 'name' },
    { title: '经度', index: 'longitude' },
    { title: '维度', index: 'Latitude' },
    { title: '站点级别', index: 'level' },
    {
      title: '动作',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
        {
          text: '查看组态图',
          type: 'link',
          click:function(data) {
            window.location.assign("#/site-admin/mxgraph?site_name=" + data.name + "&site_level=" + data.level);
          }
        },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {
  }

  ngOnInit() {

  }


  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}


