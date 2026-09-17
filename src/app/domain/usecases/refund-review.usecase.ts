import { Injectable } from "@angular/core";
import { RefundReviewGateway } from "../gateways/refund-review.gateway";

@Injectable()
export class RefundReviewUsecase {

    constructor(public refundReviewGateway: RefundReviewGateway) { }

    getRefundReview() {
        return this.refundReviewGateway.getRefundReview();
    }
}