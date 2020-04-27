import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayHomeFileViewerComponent } from './file-viewer.component';

describe('MonitorDisplayHomeFileViewerComponent', () => {
  let component: MonitorDisplayHomeFileViewerComponent;
  let fixture: ComponentFixture<MonitorDisplayHomeFileViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayHomeFileViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayHomeFileViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
