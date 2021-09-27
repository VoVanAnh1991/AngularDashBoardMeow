import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDashboardListComponent } from './view-dashboard-list.component';

describe('ViewDashboardListComponent', () => {
  let component: ViewDashboardListComponent;
  let fixture: ComponentFixture<ViewDashboardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDashboardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
