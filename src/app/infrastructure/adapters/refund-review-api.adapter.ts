import { Injectable } from "@angular/core";
import { RefundReviewGateway } from "../../domain/gateways/refund-review.gateway";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ApiResponseModel } from "../../domain/models/base/api-response.model";
import { RefundReview } from "../../domain/models/refund-review/refund-review.model";
import { RefundReviewApiDTO } from "../../domain/models/refund-review/refund-review-api.model";
import { API_URL_GET_REFUND_REVIEW } from "../helpers/constants.const";
import { mapToRefundReview } from "../mappers/refund-request.mapper";

@Injectable()
export class RefundReviewApiAdapter extends RefundReviewGateway {

    constructor(
        private httpClient: HttpClient
    ) {
        super();
    }

    override getRefundReview(): Observable<ApiResponseModel<Array<RefundReview>>> {
        return this.httpClient.get<ApiResponseModel<Array<RefundReviewApiDTO>>>(API_URL_GET_REFUND_REVIEW)
            .pipe(
                map(res => this.transformResponseArray(mapToRefundReview, res))
            );
    }

    public transformResponseArray<T, R>(transformer: (item: T) => R, response: ApiResponseModel<Array<T>>): ApiResponseModel<Array<R>> {
        return {
            totalRecords: response.totalRecords,
            data: response.data.map(transformer)
        }
    }

}