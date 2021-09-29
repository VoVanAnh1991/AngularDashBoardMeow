import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyTasksComponent } from './view-my-tasks.component';

describe('ViewMyTasksComponent', () => {
  let component: ViewMyTasksComponent;
  let fixture: ComponentFixture<ViewMyTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
