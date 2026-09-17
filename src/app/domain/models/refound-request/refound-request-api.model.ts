export type RiskLevelType = "LOW" | "HIGH" | "MEDIUM";
export type StatusType = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "ESCALATED";

export interface RefoundRequestApiDTO {
    id: string;
    orderId: string;
    customerName: string;
    amount: number;
    currency: string;
    reason: string;
    riskLevel: RiskLevelType;
    status: StatusType;
    requestedAt: string;
    customerNote: string;
    version: string;
    reviewerNote?: string;

}