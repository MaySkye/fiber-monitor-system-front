import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplaySiteRadarComponent } from './site-radar.component';

describe('MonitorDisplaySiteRedaComponent', () => {
  let component: MonitorDisplaySiteRadarComponent;
  let fixture: ComponentFixture<MonitorDisplaySiteRadarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplaySiteRadarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplaySiteRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
