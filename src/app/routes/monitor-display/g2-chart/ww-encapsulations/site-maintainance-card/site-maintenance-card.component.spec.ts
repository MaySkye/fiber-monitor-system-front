import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplaySiteMaintenanceCardComponent } from './site-maintenance-card.component';

describe('MonitorDisplaySiteMaintainanceCardComponent', () => {
  let component: MonitorDisplaySiteMaintenanceCardComponent;
  let fixture: ComponentFixture<MonitorDisplaySiteMaintenanceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplaySiteMaintenanceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplaySiteMaintenanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
