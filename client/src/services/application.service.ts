import { api } from "../lib/api";
import type {
  ApplicationRequest,
  ApplicationResponse,
} from "../types/application";

export async function submitApplication(
  payload: ApplicationRequest,
): Promise<ApplicationResponse> {
  const response = await api.post<ApplicationResponse>(
    "/applications",
    payload,
  );
  return response.data;
}
