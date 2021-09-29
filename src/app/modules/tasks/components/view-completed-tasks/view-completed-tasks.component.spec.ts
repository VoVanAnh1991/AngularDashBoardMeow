import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompletedTasksComponent } from './view-completed-tasks.component';

describe('ViewCompletedTasksComponent', () => {
  let component: ViewCompletedTasksComponent;
  let fixture: ComponentFixture<ViewCompletedTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCompletedTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompletedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
