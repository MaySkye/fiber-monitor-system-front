import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorDisplayHomeComponent } from './home.component';

describe('MonitorDisplayHomeComponent', () => {
  let component: MonitorDisplayHomeComponent;
  let fixture: ComponentFixture<MonitorDisplayHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDisplayHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDisplayHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
