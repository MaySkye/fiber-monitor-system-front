import {Component, OnInit, Input, ViewChild, TemplateRef, ElementRef, ContentChild} from '@angular/core';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'ww-card',
  styleUrls: ['./ww-card.component.less'],
  templateUrl: './ww-card.component.html'
})
export class MonitorDisplayG2ChartWwEncapsulationsWwCardComponent implements OnInit {

  @ContentChild("image") private image: TemplateRef<any>;
  @ContentChild("body") private body: TemplateRef<any>;
  @ContentChild("footer") private footer: TemplateRef<any>;
  @Input("upText") private upText: string;
  @Input("downText") private downText: string;


  @ViewChild("imageBox") private _imageBox: ElementRef;

  constructor(private _ele: ElementRef) {
  }

  ngOnInit() {
  }
}
