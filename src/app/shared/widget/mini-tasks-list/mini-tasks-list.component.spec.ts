import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniTasksListComponent } from './mini-tasks-list.component';

describe('MiniTasksListComponent', () => {
  let component: MiniTasksListComponent;
  let fixture: ComponentFixture<MiniTasksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniTasksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
