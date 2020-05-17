import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

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
    console.log('表单数据是：', this.form.value);
    console.log('当前选中记录是', this.record);
    this.msgSrv.success('保存成功');
    this.modal.close(true);
  }

  close() {
    this.modal.destroy();
  }
}
