import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcentreComponent } from './lcentre.component';

describe('LcentreComponent', () => {
  let component: LcentreComponent;
  let fixture: ComponentFixture<LcentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
