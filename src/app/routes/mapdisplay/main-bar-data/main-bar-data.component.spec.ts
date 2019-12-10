import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapdisplayMainBarDataComponent } from './main-bar-data.component';

describe('MapdisplayMainBarDataComponent', () => {
  let component: MapdisplayMainBarDataComponent;
  let fixture: ComponentFixture<MapdisplayMainBarDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdisplayMainBarDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdisplayMainBarDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
