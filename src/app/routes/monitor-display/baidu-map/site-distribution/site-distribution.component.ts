import {AfterViewInit, Component, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { environment } from '@env/environment';

declare var BMap: any;

// declare var BMapLib: any;


@Component({
  selector: 'app-baidu-site-distribution',
  templateUrl: './site-distribution.component.html',
  styleUrls: ['./site-distribution.component.less']
})
export class MonitorDisplayBaiduMapSiteDistributionComponent{
  thisX = '108.94704';
  thisY = '37.347507';
  // 弹出框
  isVisible = false;
  modalTitle: any;
  modalInfo = {};
  private map1: any;
  private line = [];
  private timer; // 定时器
  private url="http://localhost:8888/siteline/findPaintInfo";
  private siteData;
  private siteLineData;
  private hashmap=new Map();
  constructor(private http: _HttpClient, public http1: HttpClient, private router: Router) {
  }

  private ngOnInit(): void {
    this.initMap();
    setTimeout(()=>{
      this.initMap();
    },1000);
  }


  private initMap() {
    this.map1 = new BMap.Map('map1'); // 创建地图实例
    const point = new BMap.Point(this.thisX, this.thisY); // 创建点坐标
    this.map1.centerAndZoom(point, 5); // 初始化地图，设置中心点坐标和地图级别
    this.map1.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    this.map1.setMinZoom(5); // 开启鼠标滚轮缩放
    console.log(this.map1);
    // 地图样式
    this.mapStytle(this.map1);
    // 创建站点
    this.createLevel(this.map1, 1, 'red');
    this.createLevel(this.map1, 2, 'blue');
    this.createLevel(this.map1, 3, 'green');
    // 绘制线路
    this.createLine(this.map1);
  }

  // 弹出框事件
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  /** 创建标注 */
  private addMarker(map, point: any, color: string, locationInfo: any) {
    // 设置marker图标为水滴
    const marker = new BMap.Marker(point,
      {
        // 指定Marker的icon属性为Symbol
        // @ts-ignore
        icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
          scale: 1, // 图标缩放大小
          fillColor: color, // 填充颜色
          fillOpacity: 0.8, // 填充透明度
        }),
      });
    map.addOverlay(marker);

    // 构建label 样式 添加文字标签
    const content =
      '<div>' +
      '<div style="transform: translateX(-50%);' +
      'position: absolute;' +
      'left: 50%;">' + locationInfo.name + '</div>' +
      '</div>';
    const label = new BMap.Label(content, { offset: new BMap.Size(10, 25) });
    label.setStyle({ border: 'none', padding: 0, fontWeight: 'bold', fontSize: '16px' }); // 去边框
    marker.setLabel(label);
    // 构建信息窗口
    const opw = this.openInfo(locationInfo, point, map);
    // 注册点击事件,弹出信息窗口
    marker.addEventListener('click', (e) => {
        top.location.assign("http://localhost:8080/javascript/examples/grapheditor/www/index.html?site_name=zhengzhou");
        alert('点击了我')
        this.router.navigate(['/mapdisplay/StructureDiagram', locationInfo]);
        // 打开模态框
        // this.showOpenInfo(locationInfo);

      },
    );
    // 鼠标移入时触发
    marker.addEventListener('mouseover', (e) => {
        map.openInfoWindow(opw, point); // 开启信息窗口
      },
    );
    // 鼠标移出时触发
    marker.addEventListener('mouseout', e => {
        // map.closeInfoWindow();
      },
    );
  }

  // 创建连线
  private addLine(map, line: any) {
    // 创建弧线对象
    //  const curve = new BMapLib.CurveLine(line, { strokeColor: '#000000', strokeWeight: 3, strokeOpacity: 0.5 });
    // @ts-ignore
    const sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
      scale: 0.6, // 图标缩放大小
      strokeColor: '#fff', // 设置矢量图标的线填充颜色
      strokeWeight: '1', // 设置线宽
    });
    const icons = new BMap.IconSequence(sy, '10', '30');
    // 创建折线
    const polyline = new BMap.Polyline(line, { strokeColor: '#33FF00', strokeWeight: 3, strokeOpacity: 0.5, icons: [icons] });
    map.addOverlay(polyline);
    // setTimeout(polyline.setStrokeColor('red'), 5000);
    this.timer = setInterval(() => {
      const color = ['#33FF00', '#F7F709', '#F70909'];
      const a = Math.floor(Math.random() * 3);
      polyline.setStrokeColor(color[a]);
      console.log('变色');
    }, 2000);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    console.log('销毁定时器');
    // 销毁组件时清除定时器
    clearInterval(this.timer);
  }

  /** 构建地图样式 */
  private mapStytle(map: any) {
    this.http.get('assets/json/custom_map_config.json').subscribe(data => {
      map.setMapStyleV2({ styleJson: data });
    });
  }

  /** 创建坐标 */
  private createLevel(map, level, color) {
    this.http.get('assets/json/site_info.json').subscribe(data => {
      if (data.length <= 0) {
        return;
      }
      for (const i of data) {
        if (Number(i.level) === Number(level)) {
          const point = new BMap.Point(i.longitude, i.Latitude);
          this.addMarker(map, point, color, i);
        }
      }
    });
  }

  // 创建连线
  private createLine(map) {
    this.http.get('assets/json/site_info.json').subscribe(data => {
      const lineArray = [];
      let j = 0;
      for (const i of data) {
        lineArray[j] = new BMap.Point(i.longitude, i.Latitude);
        j++;
      }
      // 喀什- 西安
      const line1 = [lineArray[7], lineArray[9], lineArray[17], lineArray[10], lineArray[19], lineArray[25], lineArray[0]];
      // 环 西安-郑州
      const line2 = [lineArray[0], lineArray[22], lineArray[20], lineArray[3], lineArray[15], lineArray[0]];
      // 成都-三亚
      const line3 = [lineArray[22], lineArray[11], lineArray[12], lineArray[23], lineArray[6]];
      // 湛江-武汉
      const line4 = [lineArray[23], lineArray[26], lineArray[13], lineArray[14], lineArray[4], lineArray[24], lineArray[2], lineArray[3]];
      // 南京- 西安
      const line5 = [lineArray[24], lineArray[16], lineArray[1], lineArray[21], lineArray[0]];
      // 北京-哈尔滨
      const line6 = [lineArray[1], lineArray[8], lineArray[5], lineArray[18]];
      const line23 = [1, 1, 1, 1];
      this.addLine(this.map1, line1);
      this.addLine(this.map1, line2);
      this.addLine(this.map1, line3);
      this.addLine(this.map1, line4);
      this.addLine(this.map1, line5);
      this.addLine(this.map1, line6);
    });
  }

  /** 注册内容框的弹出事件 */
  private openInfo(content: any, point: any, map: any) {
    const opts = {
      // width: 250,     // 信息窗口宽度
      // height: 80,     // 信息窗口高度
      title: '基本信息', // 信息窗口标题
      enableMessage: true, // 设置允许信息窗发送短息
      offset: new BMap.Size(0, -23),
    };
    const sContent = '<table align="center">' +
      '<tbody>' +
      '  <tr>' +
      '    <td>名称：</td>' +
      '    <td> ' + content.name + '</td>' +
      '  </tr>' +
      '  <tr>' +
      '    <td>站点级别：</td>' +
      '    <td>' + content.level + '级</td>' +
      '  </tr>' +
      '  <tr>' +
      '    <td>编址码：</td>' +
      '    <td>000000000000001</td>' +
      '  </tr>' +
      '  <tr>' +
      '    <td>地址：</td>' +
      '    <td> ' + content.name + '市xxxx区xxxx路</td>' +
      '  </tr>' +
      // '  <tr>' +
      // '    <td><a>详情</a></td>' +
      // '    <td><a>查看组态图</a></td>' +
      // '  </tr>' +
      '</tbody>' +
      '</table>';
    const infoWindow = new BMap.InfoWindow(sContent, opts);  // 创建信息窗口对象
    return infoWindow;
    // map.openInfoWindow(infoWindow, point); // 开启信息窗口
  }

  // 弹出事件
  /*
  private showOpenInfo(locationInfo: any): void {
    // 显示弹出框
    this.isVisible = true;
    if (locationInfo !== null) {
      this.modalTitle = locationInfo.name + '站点';
      this.modalInfo = locationInfo;
    }


  }*/
}
