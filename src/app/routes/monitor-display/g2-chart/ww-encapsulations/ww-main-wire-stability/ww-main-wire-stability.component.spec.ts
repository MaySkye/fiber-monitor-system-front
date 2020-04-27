import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayG2ChartWwEncapsulationsWwMainWireStabilityComponent } from './ww-main-wire-stability.component';

describe('MonitorDisplayG2ChartWwEncapsulationsWwMainWireStabilityComponent', () => {
  let component: MonitorDisplayG2ChartWwEncapsulationsWwMainWireStabilityComponent;
  let fixture: ComponentFixture<MonitorDisplayG2ChartWwEncapsulationsWwMainWireStabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayG2ChartWwEncapsulationsWwMainWireStabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayG2ChartWwEncapsulationsWwMainWireStabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
