import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

declare var BMap: any;

// declare var BMapLib: any;

@Component({
  selector: 'app-mapdisplay-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.less'],
})
export class MapdisplayMapviewComponent implements OnInit {
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

  ngOnInit() {
    this.map1 = new BMap.Map('map1'); // 创建地图实例
    const point = new BMap.Point(this.thisX, this.thisY); // 创建点坐标
    this.map1.centerAndZoom(point, 5); // 初始化地图，设置中心点坐标和地图级别
    this.map1.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    this.map1.setMinZoom(5); // 开启鼠标滚轮缩放
    console.log(this.map1);
    // 地图样式
    this.mapStytle(this.map1);
    this.getPaintInfo();

    /*this.timer = setInterval(() => {
      this.initclear();
      this.getPaintInfo();
    }, 50000);*/
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

  getPaintInfo():void {
    this.http.get(this.url).subscribe(data => {
      if (data.length !== 0) {
        console.log('data', data);
        //let paintInfo = JSON.parse(data);
        this.siteData = data[0]["siteInfo"];
        this.siteLineData = data[0]["siteLinkInfo"];
        console.log("siteData:" + this.siteData);
        console.log("siteLineData:" + this.siteLineData);

        //可以改变一下标志
        this.createLevel(this.siteData, this.map1, 1, 'red');
        this.createLevel(this.siteData, this.map1, 2, 'blue');
        this.createLevel(this.siteData, this.map1, 3, 'green');
        this.createLine(this.siteData, this.siteLineData, this.map1);
      }
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    console.log('销毁定时器');
    // 销毁组件时清除定时器
    clearInterval(this.timer);
  }

  private initclear(){
    this.hashmap.clear();
    this.siteLineData="";
    this.siteData="";
    //清除地图
    var len =this.map1.getOverlays().length;
    for (var i = len ;i>0; i--)
    {
      this.map1.removeOverlay(this.map1.getOverlays()[i]);
    }
  }

  /** 构建地图样式 */
  private mapStytle(map: any) {
    this.http.get('assets/json/custom_map_config.json').subscribe(data => {
      map.setMapStyleV2({ styleJson: data });
    });
  }

  /** 创建坐标 */
  private createLevel(siteData,map, level, color) {
    let jsonArray = JSON.parse(siteData);
    for (let i = 0; i < jsonArray.length; i++) {
      if (jsonArray[i]["site_level"] == level) {
        let x = jsonArray[i]["site_localx"];
        let y = jsonArray[i]["site_localy"];
        let point = new BMap.Point(x,y);
        this.addMarker(map, point, color, jsonArray[i]);
      }
    }
  }
  /** 创建标注 */
  private addMarker(map, point, color, locationInfo) {
    // 设置marker图标为水滴
    const marker = new BMap.Marker(point,
      {    // 指定Marker的icon属性为Symbol
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
      'left: 50%;">' + locationInfo["site_name"] + '</div>' +
      '</div>';
    const label = new BMap.Label(content, { offset: new BMap.Size(10, 25) });
    label.setStyle({ border: 'none', padding: 0, fontWeight: 'bold', fontSize: '14px' }); // 去边框
    marker.setLabel(label);

    // 构建信息窗口
    const opw = this.openInfo(locationInfo, point, map);
    // 注册点击事件,弹出信息窗口
    marker.addEventListener('click', (e) => {
        map.openInfoWindow(opw, point); // 开启信息窗口
      },
    );
    // 鼠标移入时触发
    marker.addEventListener('mouseover', (e) => {
      },
    );
    // 鼠标移出时触发
    marker.addEventListener('mouseout', e => {
      },
    );
  }
  /** 注册内容框的弹出事件 */
  private openInfo(content, point, map) {
    const opts = {
      // width: 250,     // 信息窗口宽度
      // height: 80,     // 信息窗口高度
      title: '基本信息', // 信息窗口标题
      enableMessage: true, // 设置允许信息窗发送短息
      offset: new BMap.Size(0, -23),
    };
    const sname =content["site_name"];
    const slevel =content["site_level"];
    const surl="#/site-admin/mxgraph?sitename=" + sname + "&sitelevel=" +slevel;
    const sContent = '<table align="center">' +
      '<tbody>' +
      '  <tr>' +
      '    <td>名称：</td>' +
      '    <td> ' + content["site_name"]+ '</td>' +
      '  </tr>' +
      '  <tr>' +
      '    <td>站点级别：</td>' +
      '    <td>' + content["site_level"]+ '级</td>' +
      '  </tr>' +
      '  <tr>' +
      '    <td>编址码：</td>' +
      '    <td>000000000000001</td>' +
      '  </tr>' +
      '  <tr>' +
      '    <td>地址：</td>' +
      '    <td> ' + content["site_name"] + '市xxxx区xxxx路</td>' +
      '  </tr>' +
      '  <tr>' +
      //'    <td><a>详情</a></td>' +
      '    <td>' +
      '<a href="'+surl+'"> 查看监控图</a>'+
      '</td>' +
      '  </tr>' +
      '</tbody>' +
      '</table>';
    const infoWindow = new BMap.InfoWindow(sContent, opts);  // 创建信息窗口对象
    return infoWindow;
    // map.openInfoWindow(infoWindow, point); // 开启信息窗口
  }
// 创建连线
  private createLine(siteData,siteLineData,map) {
    let siteArray = JSON.parse(siteData);
    let lineArray = JSON.parse(siteLineData);
    //let siteArray=siteData;
    //let lineArray=siteLineData;
    console.log("lineArray:"  + lineArray.length);
    for(let a=0;a<siteArray.length;a++){
      let xx = siteArray[a]["site_localx"];
      let yy = siteArray[a]["site_localy"];
      let temp_point=new BMap.Point(xx,yy);
      this.hashmap.set(siteArray[a]["site_name"],temp_point);
    }
    for(let i=0;i<lineArray.length;i++){
      console.log("point1:"  + lineArray[i]["point1"]);
      console.log("point2:"  + lineArray[i]["point2"]);
      let point1 = new BMap.Point();
      let point2 = new BMap.Point();
      let line = [];
      point1=this.hashmap.get(lineArray[i]["point1"]);
      point2=this.hashmap.get(lineArray[i]["point2"]);
      //let linecase=lineArray[i];
      line = [point1,point2];
      this.addLine(map, line,lineArray[i]);
      console.log("success" );
    }
  }
  // 创建连线
  private addLine(map, line,linecase) {
    let color;
    if(linecase["state"]=="正常"){
      color='#33FF00';
    }else{
      color='red';
    }
    let polyline = new BMap.Polyline(line, { strokeColor:color, strokeWeight: 3, strokeOpacity: 0.5 });
    map.addOverlay(polyline);
    const opw = this.openLineInfo(linecase, polyline);
    polyline.addEventListener('click', (e) => {
        //console.log("color:"+polyline);
        map.openInfoWindow(opw, e.point); // 开启信息窗口
      },
    );
    // 鼠标移入时触发
    polyline.addEventListener('mouseover', (e) => {
        //map.openInfoWindow(opw, e.point); // 开启信息窗口
      },
    );
    // 鼠标移出时触发
    polyline.addEventListener('mouseout', e => {
      },
    );
  }
  /** 注册内容框的弹出事件 */
  private openLineInfo(linecase, polyline) {
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
      '    <td>线路名称：</td>' +
      '    <td> ' + linecase["line_name"]+ '</td>' +
      '  </tr>' +
      '  <tr>' +
      '    <td>线路类型：</td>' +
      '    <td>' + linecase["line_type"]+ '</td>' +
      '  </tr>' +
      '  <tr>' +
      '    <td>线路描述：</td>' +
      '    <td>' + linecase["line_info"]+ '</td>' +
      '  </tr>' +
      '  <tr>' +
      '    <td>线路长度：</td>' +
      '    <td> ' + linecase["length"] + '</td>' +
      '  </tr>' +
      '  <tr>' +
      '    <td>稳定度：</td>' +
      '    <td> ' + linecase["stable"] + '</td>' +
      '  </tr>' +
      '  <tr>' +
      '    <td>传输速率：</td>' +
      '    <td> ' + linecase["transspeed"] + '</td>' +
      '  </tr>' +
      '  <tr>' +
      '    <td>工作状态：</td>' +
      '    <td> ' + linecase["state"] + '</td>' +
      '  </tr>' +
      /*'  <tr>' +
      '    <td><a>发送报警信息</a></td>' +
      '  </tr>' +*/
      '</tbody>' +
      '</table>';
    const infoWindow = new BMap.InfoWindow(sContent, opts);  // 创建信息窗口对象
    return infoWindow;
  }

}
