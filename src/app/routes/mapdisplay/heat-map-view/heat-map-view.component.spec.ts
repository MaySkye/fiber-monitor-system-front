import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapdisplayHeatMapViewComponent } from './heat-map-view.component';

describe('MapdisplayHeatMapViewComponent', () => {
  let component: MapdisplayHeatMapViewComponent;
  let fixture: ComponentFixture<MapdisplayHeatMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdisplayHeatMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdisplayHeatMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
