import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayMashupSettingComponent } from './mashup-setting.component';

describe('MonitorDisplayHomeSettingComponent', () => {
  let component: MonitorDisplayMashupSettingComponent;
  let fixture: ComponentFixture<MonitorDisplayMashupSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayMashupSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayMashupSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
