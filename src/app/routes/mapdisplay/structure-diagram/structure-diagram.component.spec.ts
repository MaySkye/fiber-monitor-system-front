import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapdisplayStructureDiagramComponent } from './structure-diagram.component';

describe('MapdisplayStructureDiagramComponent', () => {
  let component: MapdisplayStructureDiagramComponent;
  let fixture: ComponentFixture<MapdisplayStructureDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdisplayStructureDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdisplayStructureDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
