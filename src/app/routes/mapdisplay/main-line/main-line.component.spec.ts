import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapdisplayMainLineComponent } from './main-line.component';

describe('MapdisplayMainLineComponent', () => {
  let component: MapdisplayMainLineComponent;
  let fixture: ComponentFixture<MapdisplayMainLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdisplayMainLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdisplayMainLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
