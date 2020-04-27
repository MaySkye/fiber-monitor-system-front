import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayG2ChartWwEncapsulationsWwRunningDeviceNumberComponent } from './ww-running-device-number.component';

describe('MonitorDisplayG2ChartWwEncapsulationsWwRunningDeviceAccountComponent', () => {
  let component: MonitorDisplayG2ChartWwEncapsulationsWwRunningDeviceNumberComponent;
  let fixture: ComponentFixture<MonitorDisplayG2ChartWwEncapsulationsWwRunningDeviceNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayG2ChartWwEncapsulationsWwRunningDeviceNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayG2ChartWwEncapsulationsWwRunningDeviceNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
