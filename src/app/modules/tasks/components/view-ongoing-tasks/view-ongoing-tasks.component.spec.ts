import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOngoingTasksComponent } from './view-ongoing-tasks.component';

describe('ViewOngoingTasksComponent', () => {
  let component: ViewOngoingTasksComponent;
  let fixture: ComponentFixture<ViewOngoingTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOngoingTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOngoingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
