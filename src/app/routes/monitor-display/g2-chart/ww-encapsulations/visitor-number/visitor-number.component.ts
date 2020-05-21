import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'ww-visitor-number',
  templateUrl: './visitor-number.component.html',
})
export class MonitorDisplayVisitorNumberComponent implements OnInit {
  data = [
    {time: '2019-07-17', value: 7}
    , {time: '2019-07-18', value: 5}
    , {time: '2019-07-19', value: 4}
    , {time: '2019-07-20', value: 2}
    , {time: '2019-07-21', value: 4}
    , {time: '2019-07-22', value: 7}
    , {time: '2019-07-23', value: 5}
    , {time: '2019-07-24', value: 6}
    , {time: '2019-07-25', value: 5}
    , {time: '2019-07-26', value: 9}
    , {time: '2019-07-27', value: 6}
    , {time: '2019-07-28', value: 3}
    , {time: '2019-07-29', value: 1}
    , {time: '2019-07-30', value: 5}
    , {time: '2019-07-31', value: 3}
    , {time: '2019-08-01', value: 6}
    , {time: '2019-08-02', value: 5}];
  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
