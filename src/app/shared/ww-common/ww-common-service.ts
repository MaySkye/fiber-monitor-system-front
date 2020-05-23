import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WwCommonService {

  constructor() {
  }


  private _token: string;
  private _mashupWidgetTheme= new Subject<string>();
  public mashupWidgetTheme = this._mashupWidgetTheme.asObservable();

  public setAuthorization(token: string) {
    this._token = 'Bearer ' + token;
    localStorage.setItem('ww-token', this._token);
  }

  public postAuthorization(iframe: any) {
    this._token = this._token || localStorage.getItem('ww-token');
    if (this._token) {
      let msg = {
        type: 'authorization',
        content: this._token,
      };
      iframe.contentWindow.postMessage(msg, '*');
      console.warn(`Post Token: ${this._token}`);
    } else {
      console.error('Token为空');
    }
  }

  public doHandleForMxGraph(iframe: any) {
    console.warn('Wait for mxGraph loaded!');
    window.onmessage = (event) => {
      if (event.data.type == 'loaded') {
        console.warn(`Get MxGraph's message: ${JSON.stringify(event.data)}`);
        this.postAuthorization(iframe);
      }
    };
  }

  public changeMashupWidgetTheme(theme: string)
  {
    this._mashupWidgetTheme.next(theme);
  }

}
