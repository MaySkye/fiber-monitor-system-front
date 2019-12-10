import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapdisplayMainTimeLineDataComponent } from './main-time-line-data.component';

describe('MapdisplayMainTimeLineDataComponent', () => {
  let component: MapdisplayMainTimeLineDataComponent;
  let fixture: ComponentFixture<MapdisplayMainTimeLineDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdisplayMainTimeLineDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdisplayMainTimeLineDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
