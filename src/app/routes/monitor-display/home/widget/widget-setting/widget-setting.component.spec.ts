import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayHomeWidgetSettingComponent } from './widget-setting.component';

describe('MonitorDisplayHomeWidgetSettingComponent', () => {
  let component: MonitorDisplayHomeWidgetSettingComponent;
  let fixture: ComponentFixture<MonitorDisplayHomeWidgetSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayHomeWidgetSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayHomeWidgetSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
