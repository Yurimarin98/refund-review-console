export interface ApiResponseModel<T> {
    totalRecords: number;
    data: T;
}