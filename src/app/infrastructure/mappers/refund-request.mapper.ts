import { RefundReviewApiDTO } from "../../domain/models/refund-review/refund-review-api.model";
import { RefundReview } from "../../domain/models/refund-review/refund-review.model";

export function mapToRefundReview(dto: RefundReviewApiDTO): RefundReview {
    return {
        id: dto.id,
        orderId: dto.orderId,
        customerName: dto.customerName,
        amount: dto.amount,
        currency: dto.currency,
        reason: dto.reason,
        riskLevel: dto.riskLevel,
        status: dto.status,
        requestedAt: new Date(dto.requestedAt),
        customerNote: dto.customerNote,
        version: dto.version,
        reviewerNote: dto.reviewerNote
    }
}
