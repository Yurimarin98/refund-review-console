import { Observable } from "rxjs";
import { ApiResponseModel } from "../models/base/api-response.model";
import { RefundReview } from "../models/refund-review/refund-review.model";

export abstract class RefundReviewGateway {
    abstract getRefundReview(): Observable<ApiResponseModel<Array<RefundReview>>>;
}