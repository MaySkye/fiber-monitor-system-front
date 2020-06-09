import { Component, OnInit, TemplateRef, ContentChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mm-item-pane',
  templateUrl: './item-pane.component.html',
  styleUrls: ['item-pane.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ItemPaneComponent implements OnInit {

  @ContentChild('content') content: TemplateRef<any>;


  constructor() {
  }

  ngOnInit() {
  }

}
