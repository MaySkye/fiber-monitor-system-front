import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayBaiduMapHeatMapComponent } from './heat-map.component';

describe('MonitorDisplayBaiduMapHeatMapComponent', () => {
  let component: MonitorDisplayBaiduMapHeatMapComponent;
  let fixture: ComponentFixture<MonitorDisplayBaiduMapHeatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayBaiduMapHeatMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayBaiduMapHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
