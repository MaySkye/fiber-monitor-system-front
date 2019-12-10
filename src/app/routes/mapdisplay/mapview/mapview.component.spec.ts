import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapdisplayMapviewComponent } from './mapview.component';

describe('MapdisplayMapviewComponent', () => {
  let component: MapdisplayMapviewComponent;
  let fixture: ComponentFixture<MapdisplayMapviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdisplayMapviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdisplayMapviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
