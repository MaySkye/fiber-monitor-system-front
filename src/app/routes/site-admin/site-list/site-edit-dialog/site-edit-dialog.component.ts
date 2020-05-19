import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-site-admin-site-edit-dialog',
  templateUrl: './site-edit-dialog.component.html',
})
export class SiteAdminSiteEditDialogComponent implements OnInit {
  record: any = {};
  @ViewChild('f') form: any;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient) {
  }

  ngOnInit(): void {
  }

  save() {

    let url = environment.SERVER_URL + 'site/updatesite';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.post(url, this.record, httpOptions).subscribe((res) => {
      console.log(res)
      if(res==1){
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      }else{
        this.msgSrv.success('保存失败');
      }
    });
    /*console.log('表单数据是：', this.form.value);
    console.log('当前选中记录是', this.record);
    this.msgSrv.success('保存成功');
    this.modal.close(true);*/
  }

  close() {
    this.modal.destroy();
  }
}
