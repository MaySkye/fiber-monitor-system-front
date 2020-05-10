import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-site-admin-site-list',
  templateUrl: './site-list.component.html',
})
export class SiteAdminSiteListComponent implements OnInit {
  // url = `/fiber/site/level-list`;
  //url = '/fiber/site?level=' + location.href.substring(location.href.lastIndexOf('level=') + 6);
  //constructor(private http: _HttpClient, public http1: HttpClient, private router: Router) {}
  constructor(private http: _HttpClient, private modal: ModalHelper, private router: Router) { }
  isVisible = false;
  url = environment.SERVER_URL+'site/findsiteinfo/'+location.href.substring(location.href.lastIndexOf('level=') + 6);
  searchSchema: SFSchema = {
    properties: {
      site_name: {
        type: 'string',
        title: '站点名称'
      },
    },
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    // {index: 'id'},
    { title: '站点名称', index: 'site_name' },
    { title: '经度', index: 'site_localx' },
    { title: '纬度', index: 'site_localy' },
    { title: '站点级别', index: 'site_level' },
    { title: '站点类型', index: 'site_type' },
    {
      title: '动作',
      buttons: [
        //{ text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
        {
          text: '查看监控图',
          type: 'link',
          click:(data) =>{
            //window.location.assign("#/site-admin/mxgraph?sitename=" + data.site_name + "&sitelevel=" + data.site_level);
            let queryParams: NavigationExtras = {
              queryParams: { 'sitename': data.site_name,
                               'sitelevel': data.site_level
              }
            };
            this.router.navigate(['/site-admin/mxgraph'], queryParams);
          }
        },
        {
          text: '查看编辑',
          type: 'link',
          click:function(data) {
            //window.location.assign("#/site-admin/mxgraph?sitename=" + data.site_name + "&sitelevel=" + data.site_level);
          }
        },
        {
          text: '删除',
          type: 'link',
          click :(data) =>{
             this.delete(data.site_name);
          }
        },
      ],
    },
  ];

  ngOnInit() {   }
  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

   delete(sitename: any) {
    let deleteUrl = environment.SERVER_URL+'site/delete/'+sitename;
    this.http.get(deleteUrl).subscribe((res:any) => {
      if(res == 0){
        console.log("删除成功");
        this.st.reload();
      }else{
        console.log("删除失败");
      }
    });
  }

  // 弹出框事件
  handleOk(){
    alert("delete");
    console.log('Button ok clicked!');
    this.isVisible = true;
  }

}


