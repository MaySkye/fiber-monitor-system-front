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

  private postAuthorization(iframe: any) {
    this._token = this._token || localStorage.getItem('ww-token');
    if (this._token) {
      let msg = {
        type: 'authorization',
        content: this._token,
      };
      iframe.contentWindow.postMessage(msg, '*');
    } else {
      console.error('Token为空');
    }
  }

  public doHandleForMxGraph(iframe: any) {
    window.onmessage = (event) => {
      if (event.data.type == 'loaded') {
        this.postAuthorization(iframe);
        console.warn(`Get MxGraph's message: ${JSON.stringify(event.data)}`);
      }
    };
  }

  public changeMashupWidgetTheme(theme: string)
  {
    this._mashupWidgetTheme.next(theme);
  }

}
