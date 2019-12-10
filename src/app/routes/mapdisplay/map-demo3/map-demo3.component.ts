import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L7 from '@antv/l7';

declare var AMap: any;

@Component({
  selector: 'app-mapdisplay-map-demo3',
  styleUrls: ['./map-demo3.component.less'],
  templateUrl: './map-demo3.component.html',
})
export class MapdisplayMapDemo3Component implements OnInit {
  public scene: any;
  public position: [];


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.createMap();
  }

  private createMap() {

    var mapinstance = new AMap.Map('map', {
      center: [116.397428, 39.90923],
      viewMode: '3D',
      pitch: 0,
      zoom: 3,
      maxZoom: 20,
      minZoom: 0,
    });
    this.scene = new L7.Scene({
      mapStyle: 'amap://styles/macaron', // 样式URL
      map: mapinstance,
    });
    this.scene.on('loaded', () => {
        //打印地图日志
        console.log(this.scene.map);
        const scene1 = this.scene.map;
        const scene = this.scene;
        // 添加图片
        scene.image.addImage('local', 'https://gw.alipayobjects.com/zos/rmsportal/xZXhTxbglnuTmZEwqQrE.png');
        // 画个线
        this.http.get('https://gw.alipayobjects.com/os/rmsportal/kwUdcXnxQtexeGRvTGtA.json').subscribe(contourData => {
          scene.LineLayer({
            zIndex: 2,
          }).source(contourData).color('rgb(79,147,234)').size([1.5, 0]).shape('line').style({
            'lineType': 'solid',
          }).render();
        });
        // 画点
        this.http.get('https://gw.alipayobjects.com/os/rmsportal/opYqFyDGyGUAUXkLUhBV.json').subscribe(data => {
          console.log(scene.image);
          scene.PointLayer({
            zIndex: 3,
          }).source(data)
            .size(5.0)
            .shape('2d:circle')
            .color('#0D408C')
            // .style({
            //   stroke: 'rgb(255,255,255)',
            //   strokeWidth: 0,
            //   opacity: 1.0,
            // })
            .render();


          scene.PointLayer({ zIndex: 8, minZoom: 5 })
            .source(data)
            .size(14.0)
            .shape('name', 'text')
            .color('rgba(0,0,0,0.85)')
            .style({
              textOffset: [-20, 22],
              stroke: '#fff',
              strokeWidth: 4,
            })
            .render();

          // 图片代码
          // scene.ImageLayer()
          //   .source('https://gw.alipayobjects.com/zos/rmsportal/FnHFeFklTzKDdUESRNDv.jpg', {
          //     parser: {
          //       type: 'image',
          //       extent: [121.1680, 30.2828, 141.3840, 60.4219],
          //     },
          //   })
          //   .style({
          //     opacity: 1.0,
          //   })
          //   .size(100)
          //   .shape('fill')
          //   .render();

          // 触发鼠标事件
          scene.on('click', (ev) => {

            console.log('我触发了点击事件');
            console.log(ev);

          });
        });

      },
    );


  }
}
