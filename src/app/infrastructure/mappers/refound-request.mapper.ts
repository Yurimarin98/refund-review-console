import { RefoundRequestApiDTO } from "../../domain/models/refound-request/refound-request-api.model";
import { RefoundRequest } from "../../domain/models/refound-request/refound-request.model";

export class RefoundRequestMapper {
    static fromApi(dto: RefoundRequestApiDTO): RefoundRequest {
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
}