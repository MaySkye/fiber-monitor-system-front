import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { environment } from '@env/environment';
import { SFSchema } from '@delon/form';
import { STColumn, STComponent } from '@delon/abc';
import {SiteAdminSitelineEditDialogComponent} from './siteline-edit-dialog/siteline-edit-dialog.component';

@Component({
  selector: 'app-site-admin-siteline-list',
  templateUrl: './siteline-list.component.html',
})
export class SiteAdminSitelineListComponent implements OnInit {

  url = environment.SERVER_URL + 'siteline/findall';
  searchSchema: SFSchema = {
    properties: {
      line_name: {
        type: 'string',
        title: '链路名称',
      },
    },
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '链路名称', index: 'line_name' },
    { title: '起点', index: 'point1' },
    { title: '终点', index: 'point2' },
    { title: '类型', index: 'line_type' },
    {
      title: '动作',
      buttons: [
        {
          text: '查看编辑',
          type: 'link',
          click: (data) => {
            this.modal.create(SiteAdminSitelineEditDialogComponent, {
              record: data,
            }).subscribe(() => {
              this.getData();
            });
          },
        },
        {
          text: '删除',
          type: 'link',
          click: (data) => {
            //window.location.assign("#/site-admin/mxgraph?sitename=" + data.name + "&sitelevel=" + data.level);
            this.delete(data.line_name);
          },
        },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {
  }

  ngOnInit() {
    this.getData();
  }

  delete(name: any) {
    let deleteUrl = environment.SERVER_URL + 'siteline/delete/' + name;
    this.http.get(deleteUrl).subscribe((res: any) => {
      if (res == 0) {
        console.log('删除成功');
        this.getData();
      } else {
        console.log('删除失败');
      }
    });
  }

  // 王伟加入搜索功能
  public data;

  public getData() {
    this.http.get(this.url).subscribe((res) => {
      this.data = res == null ? [] : res;
    });
  }

  public search(event) {
    let searchField = 'line_name';
    this.data = this.data.filter((record) => {
      return record[searchField].indexOf(event[searchField]) != -1;
    });
  }
}
