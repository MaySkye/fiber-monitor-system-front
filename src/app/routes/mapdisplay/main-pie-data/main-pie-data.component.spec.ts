import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapdisplayMainPieDataComponent } from './main-pie-data.component';

describe('MapdisplayMainPieDataComponent', () => {
  let component: MapdisplayMainPieDataComponent;
  let fixture: ComponentFixture<MapdisplayMainPieDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdisplayMainPieDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdisplayMainPieDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
