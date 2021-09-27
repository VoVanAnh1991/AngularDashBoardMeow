import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTasksListComponent } from './view-tasks-list.component';

describe('ViewTasksListComponent', () => {
  let component: ViewTasksListComponent;
  let fixture: ComponentFixture<ViewTasksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTasksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
