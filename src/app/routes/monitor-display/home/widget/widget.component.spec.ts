import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayHomeWidgetComponent } from './widget.component';

describe('MonitorDisplayHomeWidgetComponent', () => {
  let component: MonitorDisplayHomeWidgetComponent;
  let fixture: ComponentFixture<MonitorDisplayHomeWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayHomeWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayHomeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
