export interface IMeta {
    total: number;
    page: number;
    limit: number
}

export interface ISearchParams {
    page?: string
    limit?: string
    search?: string
}