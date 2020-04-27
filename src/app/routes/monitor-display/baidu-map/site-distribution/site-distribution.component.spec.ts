import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayBaiduMapSiteDistributionComponent } from './site-distribution.component';

describe('MonitorDisplayBaiduMapSiteDistributionComponent', () => {
  let component: MonitorDisplayBaiduMapSiteDistributionComponent;
  let fixture: ComponentFixture<MonitorDisplayBaiduMapSiteDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayBaiduMapSiteDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayBaiduMapSiteDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
