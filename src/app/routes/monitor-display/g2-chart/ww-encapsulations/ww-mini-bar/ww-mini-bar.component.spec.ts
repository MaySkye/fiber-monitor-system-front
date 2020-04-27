import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayG2ChartWwEncapsulationsWwMiniBarComponent } from './ww-mini-bar.component';

describe('MonitorDisplayG2ChartWwEncapsulationsWwMiniBarComponent', () => {
  let component: MonitorDisplayG2ChartWwEncapsulationsWwMiniBarComponent;
  let fixture: ComponentFixture<MonitorDisplayG2ChartWwEncapsulationsWwMiniBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayG2ChartWwEncapsulationsWwMiniBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayG2ChartWwEncapsulationsWwMiniBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
