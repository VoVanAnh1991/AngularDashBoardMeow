import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoomsListComponent } from './view-rooms-list.component';

describe('ViewRoomsListComponent', () => {
  let component: ViewRoomsListComponent;
  let fixture: ComponentFixture<ViewRoomsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRoomsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRoomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
