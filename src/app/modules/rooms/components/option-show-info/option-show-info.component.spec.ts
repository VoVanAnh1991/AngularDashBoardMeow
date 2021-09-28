import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionShowInfoComponent } from './option-show-info.component';

describe('OptionShowInfoComponent', () => {
  let component: OptionShowInfoComponent;
  let fixture: ComponentFixture<OptionShowInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionShowInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionShowInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
