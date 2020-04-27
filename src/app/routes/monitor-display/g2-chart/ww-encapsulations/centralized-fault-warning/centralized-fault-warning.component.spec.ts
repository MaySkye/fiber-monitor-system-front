import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayG2ChartWwEncapsulationsCentralizedFaultWarningComponent } from './centralized-fault-warning.component';

describe('MonitorDisplayG2ChartWwEncapsulationsCentralizedFaultWarningComponent', () => {
  let component: MonitorDisplayG2ChartWwEncapsulationsCentralizedFaultWarningComponent;
  let fixture: ComponentFixture<MonitorDisplayG2ChartWwEncapsulationsCentralizedFaultWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayG2ChartWwEncapsulationsCentralizedFaultWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayG2ChartWwEncapsulationsCentralizedFaultWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
