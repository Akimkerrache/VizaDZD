export interface ApiErrorResponse {
  error?: string;
  details?: Array<{ field?: string; message: string }>;
}
