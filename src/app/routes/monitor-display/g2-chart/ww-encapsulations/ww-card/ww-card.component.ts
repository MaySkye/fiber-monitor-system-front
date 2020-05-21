import {Component, OnInit, Input, ViewChild, TemplateRef, ElementRef, ContentChild} from '@angular/core';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'ww-card',
  styleUrls: ['./ww-card.component.less'],
  templateUrl: './ww-card.component.html'
})
export class MonitorDisplayG2ChartWwEncapsulationsWwCardComponent implements OnInit {

  @ContentChild("image") image: TemplateRef<any>;
  @ContentChild("body") body: TemplateRef<any>;
  @ContentChild("footer") footer: TemplateRef<any>;
  @Input("upText") upText: string;
  @Input("downText") downText: string;


  @ViewChild("imageBox") private _imageBox: ElementRef;

  constructor(public _ele: ElementRef) {
  }

  ngOnInit() {
  }
}
