import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayVisitorNumberComponent } from './visitor-number.component';

describe('MonitorDisplayVisitorNumberComponent', () => {
  let component: MonitorDisplayVisitorNumberComponent;
  let fixture: ComponentFixture<MonitorDisplayVisitorNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayVisitorNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayVisitorNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
