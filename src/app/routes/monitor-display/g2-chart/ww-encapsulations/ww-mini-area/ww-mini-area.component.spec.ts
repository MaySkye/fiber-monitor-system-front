import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayG2ChartWwEncapsulationsWwMiniAreaComponent } from './ww-mini-area.component';

describe('MonitorDisplayG2ChartWwEncapsulationsWwMiniAreaComponent', () => {
  let component: MonitorDisplayG2ChartWwEncapsulationsWwMiniAreaComponent;
  let fixture: ComponentFixture<MonitorDisplayG2ChartWwEncapsulationsWwMiniAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayG2ChartWwEncapsulationsWwMiniAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayG2ChartWwEncapsulationsWwMiniAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
