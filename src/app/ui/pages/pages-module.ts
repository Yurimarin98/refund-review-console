import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from './pages';
import { ConsultRefundReview } from './consult-refund-review/consult-refund-review';
import { RefundReviewUsecase } from '../../domain/usecases/refund-review.usecase';
import { environment } from '../../../environments/environment';
import { RefundReviewApiAdapterMock } from '../../infrastructure/adapters/refund-review-api.adapter.mock';
import { RefundReviewApiAdapter } from '../../infrastructure/adapters/refund-review-api.adapter';

export const routes: Routes = [
  {
    path: '',
    component: Pages,
    children: [
      {
        path: 'list',
        component: ConsultRefundReview
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    RefundReviewUsecase,
    { provide: RefundReviewUsecase, useClass: environment.activateAdapterMocks ? RefundReviewApiAdapterMock : RefundReviewApiAdapter }
  ]
})
export class PagesModule { }
