import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeingRemovedComponent } from './being-removed.component';

describe('BeingRemovedComponent', () => {
  let component: BeingRemovedComponent;
  let fixture: ComponentFixture<BeingRemovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeingRemovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeingRemovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
