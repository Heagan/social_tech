import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysActivityViewComponent } from './todays-activity-view.component';

describe('TodaysActivityViewComponent', () => {
  let component: TodaysActivityViewComponent;
  let fixture: ComponentFixture<TodaysActivityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysActivityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysActivityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
