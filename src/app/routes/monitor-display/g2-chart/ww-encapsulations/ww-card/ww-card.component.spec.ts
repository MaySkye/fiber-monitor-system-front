import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayG2ChartWwEncapsulationsWwCardComponent } from './ww-card.component';

describe('MonitorDisplayG2ChartWwEncapsulationsWwCardComponent', () => {
  let component: MonitorDisplayG2ChartWwEncapsulationsWwCardComponent;
  let fixture: ComponentFixture<MonitorDisplayG2ChartWwEncapsulationsWwCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayG2ChartWwEncapsulationsWwCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayG2ChartWwEncapsulationsWwCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
