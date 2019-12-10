import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapdisplayMonitorComponent } from './monitor.component';

describe('MapdisplayMonitorComponent', () => {
  let component: MapdisplayMonitorComponent;
  let fixture: ComponentFixture<MapdisplayMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdisplayMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdisplayMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
