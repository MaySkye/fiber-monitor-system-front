import { _HttpClient, SettingsService } from '@delon/theme';
import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { DA_SERVICE_TOKEN, ITokenService, SocialOpenType, SocialService } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core';
import { WwCommonService } from '@shared/ww-common/ww-common-service';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  count = 0;

  // pem文件内容
  private pemFileContent: string;

  // #region fields
  interval$: any;

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    private notification: NzNotificationService,
    private mxGraphAuthService: WwCommonService,  // 王伟：mxgraph验证服务
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      pemFile: [null, [Validators.required, Validators.pattern(/.*\.pem/)]],
      // mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  get userName() {
    return this.form.controls.userName;
  }

  get password() {
    return this.form.controls.password;
  }

  get pemFile() {
    return this.form.controls.pemFile;
  }

  // #endregion


  switch(ret: any) {
    this.type = ret.index;
  }


  // #endregion

  submit() {
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      this.pemFile.markAsDirty();
      this.pemFile.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid || this.pemFile.invalid) return;
    }

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.http
      .post(environment.SERVER_URL + 'api/authenticate?_allow_anonymous=true', {
        username: this.userName.value,
        password: this.password.value,
        pemFileContent: this.pemFileContent,
      })
      .subscribe((res: any) => {
        // 清空路由复用信息
        this.reuseTabService.clear();
        if (res.id_token) {
          const user = {
            token: res.id_token,
            name: this.userName.value,
            email: `${this.userName.value}@bupt.com`,
            avatar: './assets/image/bupt.svg',
            time: +new Date(),
          };
          // 设置用户Token信息
          this.tokenService.set(user);
          this.settingsService.setUser(user);
          this.mxGraphAuthService.setAuthorization(res.id_token);
        } else {
          this.error = res.msg || '账号或密码错误';
          return;
        }
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        this.startupSrv.load().then(() => {
          // tslint:disable-next-line:no-non-null-assertion
          let url = this.tokenService.referrer!.url || '/';
          if (url.includes('/passport')) url = '/';
          this.router.navigateByUrl(url).then(r => {});
        });
      }, err => {
        let { error } = err;
        // 如果有响应
        if (error) {
          switch (error.status) {
            case 400:
              this.error = error.title;
              break;
            case 401:
              this.error = '账户密码错误';
              break;
            default:
              this.error = "未知错误！";
              break;
          }
        }
        // 如果无响应
        else {
          this.error = '请检查网络连接！';
        }
      });
  }

  // 选择.pem文件
  choosePemFile() {
    // 打开文件选择框
    let fileChooser = document.createElement('input');
    fileChooser.type = 'file';
    fileChooser.click();
    // 监听新文件
    fileChooser.onchange = () => {
      this.form.controls.pemFile.setValue(fileChooser.value);
      let fileReader = new FileReader();
      fileReader.readAsText(fileChooser.files[0]);
      fileReader.onload = () => {
        this.pemFileContent = fileReader.result.toString();
      };
    };
  }

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
