import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionAnnouncementHistoryComponent } from './option-announcement-history.component';

describe('OptionAnnouncementHistoryComponent', () => {
  let component: OptionAnnouncementHistoryComponent;
  let fixture: ComponentFixture<OptionAnnouncementHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionAnnouncementHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionAnnouncementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
