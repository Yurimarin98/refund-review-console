import { environment } from "../../../environments/environment";

export const BASE_ROUTE_URL: string = 'refund-review';

export const API_URL_GET_REFUND_REVIEW = `${environment.BASE_API_URL}/api/refunds`;
export const API_URL_UPDATE_REFUND_REVIEW = `${environment.BASE_API_URL}/api/refunds/`;
export const API_URL_GET_SESSION = `${environment.BASE_API_URL}/api/session`;

export const UTILS_NUMBERS = {
    NUMBER_2000: 2000
}