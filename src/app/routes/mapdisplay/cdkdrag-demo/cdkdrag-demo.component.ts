import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-mapdisplay-cdkdrag-demo',
  templateUrl: './cdkdrag-demo.component.html',
})
export class MapdisplayCdkdragDemoComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
