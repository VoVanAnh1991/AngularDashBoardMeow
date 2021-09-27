import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAssignedTasksComponent } from './not-assigned-tasks.component';

describe('NotAssignedTasksComponent', () => {
  let component: NotAssignedTasksComponent;
  let fixture: ComponentFixture<NotAssignedTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAssignedTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAssignedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
