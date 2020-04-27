import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-site-admin-sitetool',
  templateUrl: './sitetool.component.html',
})
export class SiteAdminSitetoolComponent implements OnInit {
  
  id = this.route.snapshot.params.id;
  i: any;

  constructor(
    private route: ActivatedRoute,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    //this.http.get(`/user/${this.id}`).subscribe(res => this.i = res);
    let url = 'http://localhost:8089/mxgraph/examples/grapheditor/www/sitemap.html';
    //let url = ' http://localhost:8080/javascript/examples/grapheditor/www/sitemap.html';
    document.getElementById('sitetool')["src"] = url;
  }
}
