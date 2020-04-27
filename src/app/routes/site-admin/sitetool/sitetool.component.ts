import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { MxgraphAuthService } from '@shared/mxgraph/mxgraph-auth.service';

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
    public http: _HttpClient,
    private mxGraphAuthService: MxgraphAuthService,
  ) {
  }

  ngOnInit(): void {
    //this.http.get(`/user/${this.id}`).subscribe(res => this.i = res);
    let url = 'http://localhost:8089/mxgraph/examples/grapheditor/www/sitemap.html';
    //let url = ' http://localhost:8080/javascript/examples/grapheditor/www/sitemap.html';
    let iframe = document.getElementById('sitetool');
    iframe['src'] = url;
    this.mxGraphAuthService.doHandle(iframe);
  }
}
