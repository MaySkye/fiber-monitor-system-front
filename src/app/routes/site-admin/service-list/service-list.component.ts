import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SFSchema } from '@delon/form';
import { STColumn, STComponent } from '@delon/abc';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-site-admin-service-list',
  templateUrl: './service-list.component.html',
})
export class SiteAdminServiceListComponent implements OnInit {

  constructor(private http: _HttpClient, private modal: ModalHelper,private router: Router) { }
  url=environment.SERVER_URL+'mongo/getAllServiceInfo';
  searchSchema: SFSchema = {
    properties: {
      site_name: {
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
          click:(data)=> {
            //window.location.assign("#/site-admin/mxgraph?sitename=" + data.site_name);
            let queryParams: NavigationExtras = {
              queryParams: { 'md5': data.md5 ,
                'sitename': data.site_name
              }
            };
            this.router.navigate(['/site-admin/mxgraph'], queryParams);
          }
        },
        {
          text: '删除',
          type: 'link',
          click:(data)=> {
            this.delete(data.md5);
          }
        },
      ],
    },
  ];



  ngOnInit(): void {
    this.getData();
  }

  delete(md5: any) {
    let deleteUrl = environment.SERVER_URL+'mongo/delete/'+md5;
    console.log("md5: "+md5);
    this.http.get(deleteUrl).subscribe((res:any) => {
      this.getData();
    });
  }

  private data;
  private getData(){
    this.http.get(this.url).subscribe((res)=>{
      this.data = res==null?[]:res;
    });
  }
  private search(event)
  {
    let searchField = 'site_name';
    this.data = this.data.filter((record)=>{
      return record[searchField].indexOf(event[searchField]) != -1;
    });
  }
}
