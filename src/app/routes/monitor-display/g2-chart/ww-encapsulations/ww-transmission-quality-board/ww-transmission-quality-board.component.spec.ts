import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayG2ChartWwEncapsulationsWwTransmissionQualityBoardComponent } from './ww-transmission-quality-board.component';

describe('MonitorDisplayG2ChartWwEncapsulationsWwTransmissionQualityBoardComponent', () => {
  let component: MonitorDisplayG2ChartWwEncapsulationsWwTransmissionQualityBoardComponent;
  let fixture: ComponentFixture<MonitorDisplayG2ChartWwEncapsulationsWwTransmissionQualityBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayG2ChartWwEncapsulationsWwTransmissionQualityBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayG2ChartWwEncapsulationsWwTransmissionQualityBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
