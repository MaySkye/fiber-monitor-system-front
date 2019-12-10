import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteAdminMxgraphComponent } from './mxgraph.component';

describe('SiteAdminMxgraphComponent', () => {
  let component: SiteAdminMxgraphComponent;
  let fixture: ComponentFixture<SiteAdminMxgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAdminMxgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdminMxgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
