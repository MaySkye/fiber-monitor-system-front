import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mm-item-pane',
  templateUrl: './item-pane.component.html',
  styleUrls: ['item-pane.component.less'],
})
export class ItemPaneComponent implements OnInit {

  @Input('title') title: string;
  @Input('detail') detail: string;

  constructor() {
  }

  ngOnInit() {
  }

}
