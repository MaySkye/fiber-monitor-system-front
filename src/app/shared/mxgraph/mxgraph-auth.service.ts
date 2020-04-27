import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MxgraphAuthService {

  constructor() {
  }

  private token: string;

  public setAuthorization(token: string) {
    this.token = 'Bearer ' + token;
    localStorage.setItem('ww-token', this.token);
  }

  public postAuthorization(iframe: any) {
    this.token = this.token || localStorage.getItem('ww-token');
    if (this.token) {
      let msg = {
        type: 'authorization',
        content: this.token,
      };
      iframe.contentWindow.postMessage(msg, '*');
    } else {
      console.error('Token为空');
    }
  }

  public doHandle(iframe: any) {
    window.onmessage = (event) => {
      if (event.data.type == 'loaded') {
        this.postAuthorization(iframe);
        console.warn(`Get MxGraph's message: ${JSON.stringify(event.data)}`);
      }
    };
  }
}
