import { Injectable } from "@angular/core";
import { RefundReviewGateway } from "../../domain/gateways/refund-review.gateway";
import { HttpClient } from "@angular/common/http";
import { delay, map, Observable, of } from "rxjs";
import { ApiResponseModel } from "../../domain/models/base/api-response.model";
import { RefundReview } from "../../domain/models/refund-review/refund-review.model";
import { RefundReviewApiDTO } from "../../domain/models/refund-review/refund-review-api.model";
import { API_URL_GET_REFUND_REVIEW, UTILS_NUMBERS } from "../helpers/constants.const";
import { mapToRefundReview } from "../mappers/refund-request.mapper";

export const getRefundReviewResponseMock: ApiResponseModel<Array<RefundReviewApiDTO>> = {
    "totalRecords": 5,
    "data": [
        {
            "id": "REF-001",
            "orderId": "ORD-9021",
            "customerName": "Ana María Gómez",
            "amount": 125.50,
            "currency": "USD",
            "reason": "El producto llegó con daños visibles en el empaque.",
            "riskLevel": "LOW",
            "status": "PENDING",
            "requestedAt": "2026-09-15T10:30:00Z",
            "customerNote": "Solicito reembolso completo a mi tarjeta original.",
            "version": 1
        },
        {
            "id": "REF-002",
            "orderId": "ORD-8451",
            "customerName": "Carlos Andrés Pérez",
            "amount": 450.00,
            "currency": "USD",
            "reason": "El paquete nunca fue entregado por la transportadora.",
            "riskLevel": "HIGH",
            "status": "UNDER_REVIEW",
            "requestedAt": "2026-09-14T14:20:00Z",
            "customerNote": "Exijo una solución urgente o interpondré una queja formal.",
            "version": 1
        },
        {
            "id": "REF-003",
            "orderId": "ORD-7123",
            "customerName": "Sofía Rodriguez",
            "amount": 45.00,
            "currency": "USD",
            "reason": "Cobro duplicado en la pasarela de pagos.",
            "riskLevel": "MEDIUM",
            "status": "PENDING",
            "requestedAt": "2026-09-16T09:15:00Z",
            "customerNote": "<script>alert('XSS Test');</script> Por favor revisar mi saldo.",
            "version": 1
        },
        {
            "id": "REF-004",
            "orderId": "ORD-6390",
            "customerName": "Jorge Luis Martínez",
            "amount": 1200.00,
            "currency": "USD",
            "reason": "Disputa de transacción de alto valor sin autorización.",
            "riskLevel": "HIGH",
            "status": "UNDER_REVIEW",
            "requestedAt": "2026-09-13T18:45:00Z",
            "customerNote": "No reconozco este cargo en mi estado de cuenta.",
            "version": 2
        },
        {
            "id": "REF-005",
            "orderId": "ORD-5112",
            "customerName": "Lucía Fernández",
            "amount": 89.90,
            "currency": "USD",
            "reason": "Talla incorrecta del producto solicitado.",
            "riskLevel": "LOW",
            "status": "APPROVED",
            "requestedAt": "2026-09-12T11:10:00Z",
            "customerNote": "Quiero cambiarlo por una talla M pero acepto reembolso.",
            "version": 3
        }
    ]
}

@Injectable()
export class RefundReviewApiAdapterMock extends RefundReviewGateway {

    constructor(
    ) {
        super();
    }

    override getRefundReview(): Observable<ApiResponseModel<Array<RefundReview>>> {
        return of(getRefundReviewResponseMock)
            .pipe(
                delay(UTILS_NUMBERS.NUMBER_2000),
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