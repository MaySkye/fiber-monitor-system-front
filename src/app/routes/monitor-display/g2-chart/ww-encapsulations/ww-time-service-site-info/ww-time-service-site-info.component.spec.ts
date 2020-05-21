import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayWwTimeServiceSiteInfoComponent } from './ww-time-service-site-info.component';

describe('MonitorDisplayWwTimeServiceSiteInfoComponent', () => {
  let component: MonitorDisplayWwTimeServiceSiteInfoComponent;
  let fixture: ComponentFixture<MonitorDisplayWwTimeServiceSiteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayWwTimeServiceSiteInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayWwTimeServiceSiteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
