import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-mapdisplay-structure-diagram',
  templateUrl: './structure-diagram.component.html',
  styleUrls: ['./structure-diagram.component.less'],
})
export class MapdisplayStructureDiagramComponent implements OnInit {
  SiteInfo = {
    name: '',
  };
  public aa;
  // 控制基本显示
  public exhibition;
  // 控制图片显示
  public exhibitionImg;
  // 图片展示
  public imageUrl;
  a11OutputPower: any = '0';
  a11LightsourceBlockedState: any = '0';
  a11LonPumpCurrent: any = '0';
  a11TransmissionPeakVoltage: any = '0';
  a11PowerStatus: any = '0';
  a11AOMOutputPower: any = '0';
  a11AOMDrivePower: any = '0';
  a11PreCavityOutputVoltage: any = '0';
  a11PreCavityOutputRF: any = '0';
  a11PostCavityOutputVoltage: any = '0';
  a12InputPower: any = '0';
  a12AOMDrivePower: any = '0';
  a12PowerStatus: any = '0';
  a13InputPower: any = '0';
  a13AOMDrivePower: any = '0';
  a13PowerStatus: any = '0';
  a14OutOfBandSignal: any = '0';
  a15InputPower: any = '0';
  a15AOMDrivePower: any = '0';
  a15PowerStatus: any = '0';
  a16InputPower: any = '0';
  a16AOMDrivePower: any = '0';
  a16PowerStatus: any = '0';
  // 关闭加载
  isLoadingOne = false;
  // 控制弹出框
  isVisible = false;
  // 弹出框中需要展示的异常信息
  alarmData: any;
  // 弹出框的确认按钮加载
  isConfirmLoading = false;
  alarmImg = [0, 0, 0, 0, 0, 0, 0];
  // alarmImg = [1, 1, 1, 1, 1, 1, 1];
  // 设置警报图片的隐藏
  private timer; // 定时器

  constructor(private http: _HttpClient, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    // 获取参数
    this.route.params.subscribe((params: any) => {
      // debugger;
      this.SiteInfo = params || '';
      console.log(this.SiteInfo);
    });
    // 获取图片数据
    this.getImage();
    // 获取右侧数据
    this.getRightInfo();
    // 构建定时器 10秒后刷新数据
    this.timer = setInterval(() => {
      this.getImage();
      this.getRightInfo();
      this.showAlarmImg();
      // 刷新标记
      this.aa = new Date().getTime();
      console.log('刷新', this.aa);
    }, 10000);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    console.log('销毁定时器');
    // 销毁组件时清除定时器
    clearInterval(this.timer);
  }

  getImage() {
    this.http.get('telemetry_image/siteimage?siteName=' + this.SiteInfo.name).subscribe(data => {
      if (data.length !== 0) {
        console.log('data', data);
        if (data.status !== 1) {
          this.exhibition = 1;
          this.exhibitionImg = 0;
        } else {
          this.imageUrl = environment.SERVER_URL + 'telemetry_image/getimage?siteName=' + this.SiteInfo.name + '&aa=' + this.aa;
          this.exhibition = 0;
          this.exhibitionImg = 1;
        }
      }
    });
  }

  getRightInfo() {
    // telemetry/find-voltdb-all
    // telemetry/findall
    this.http.get('telemetry/findall').subscribe(data => {
      if (data.length !== 0) {
        this.a11OutputPower = data[29].detectedValue;
        this.a11LightsourceBlockedState = data[30].detectedValue;
        this.a11LonPumpCurrent = data[31].detectedValue;
        this.a11TransmissionPeakVoltage = data[32].detectedValue;
        this.a11PowerStatus = data[33].detectedValue;
        this.a11AOMOutputPower = data[34].detectedValue;
        this.a11AOMDrivePower = data[35].detectedValue;
        this.a11PreCavityOutputVoltage = data[36].detectedValue;
        this.a11PreCavityOutputRF = data[37].detectedValue;
        this.a11PostCavityOutputVoltage = data[38].detectedValue;
        this.a12InputPower = data[39].detectedValue;
        this.a12AOMDrivePower = data[40].detectedValue;
        this.a12PowerStatus = data[41].detectedValue;
        this.a13InputPower = data[42].detectedValue;
        this.a13AOMDrivePower = data[43].detectedValue;
        this.a13PowerStatus = data[44].detectedValue;
        this.a14OutOfBandSignal = data[45].detectedValue;
        this.a15InputPower = data[46].detectedValue;
        this.a15AOMDrivePower = data[47].detectedValue;
        this.a15PowerStatus = data[48].detectedValue;
        this.a16InputPower = data[49].detectedValue;
        this.a16AOMDrivePower = data[50].detectedValue;
        this.a16PowerStatus = data[51].detectedValue;
      }
    });
  }


  // 发送关闭设备命令
  sendClosed() {
    this.isLoadingOne = true;
    this.http.get('wsn/sendClosed').subscribe(data => {
      if (data.status === '1') {
        setTimeout(() => {
          this.isLoadingOne = false;
          alert('设备已重置');
        }, 1000);
      }
    });
  }

  // 以下是弹出框的操作
  showAlarmInfo(val, alarmInfo) {
    // alert('点击事件触发，设备是' + val);
    if (alarmInfo !== 1) {
      return;
    }
    this.alarmData = val + '发生数据异常， 数据大于标准值，是否重置当前设备？';
    this.isVisible = true;

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {

    this.isLoadingOne = true;
    this.http.get('wsn/sendClosed').subscribe(data => {
      if (data.status === '1') {
        setTimeout(() => {
          // 点击关闭后重置所有设备
          this.isVisible = false;
          this.isLoadingOne = false;
          this.alarmImg = [0, 0, 0, 0, 0, 0, 0];
          alert('设备操作完毕');
        }, 1000);
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showAlarmImg() {
    if (this.exhibition === 1) {
      // 请求接口 判断是否有异常数据
      this.http.get('alarmDevice/getAlarmDevice').subscribe(data => {
        if (data.length !== 0) {
          console.log('data', data);
          if (data.status === 1) {
            // 随机让一个设备产生报警，然后让图片显示
            const a = Math.floor(Math.random() * 7);
            console.log(this.alarmImg);
            for (const i of this.alarmImg) {
              if (i === 1) {
                return;
              }
            }
            this.alarmImg[a] = 1;
          }
        }
      });
    }
  }

}
