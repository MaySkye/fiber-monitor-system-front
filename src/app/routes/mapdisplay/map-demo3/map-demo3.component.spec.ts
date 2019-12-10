import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapdisplayMapDemo3Component } from './map-demo3.component';

describe('MapdisplayMapDemo3Component', () => {
  let component: MapdisplayMapDemo3Component;
  let fixture: ComponentFixture<MapdisplayMapDemo3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdisplayMapDemo3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdisplayMapDemo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
