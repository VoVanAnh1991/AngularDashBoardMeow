import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionShowMessagesComponent } from './option-show-messages.component';

describe('OptionShowMessagesComponent', () => {
  let component: OptionShowMessagesComponent;
  let fixture: ComponentFixture<OptionShowMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionShowMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionShowMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
