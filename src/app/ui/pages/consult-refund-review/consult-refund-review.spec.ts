import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultRefundReview } from './consult-refund-review';

describe('ConsultRefundReview', () => {
  let component: ConsultRefundReview;
  let fixture: ComponentFixture<ConsultRefundReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultRefundReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultRefundReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
