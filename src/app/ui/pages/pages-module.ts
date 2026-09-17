import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from './pages';
import { ConsultRefundReview } from './consult-refund-review/consult-refund-review';

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
  ]
})
export class PagesModule { }
