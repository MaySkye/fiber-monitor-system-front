import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapdisplayCdkdragDemoComponent } from './cdkdrag-demo.component';

describe('MapdisplayCdkdragDemoComponent', () => {
  let component: MapdisplayCdkdragDemoComponent;
  let fixture: ComponentFixture<MapdisplayCdkdragDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdisplayCdkdragDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdisplayCdkdragDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
