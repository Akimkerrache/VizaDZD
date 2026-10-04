import { useMutation } from "@tanstack/react-query";
import { submitApplication } from "../services/application.service";
import type { ApplicationRequest } from "../types/application";

export function useApplicationSubmission() {
  return useMutation({
    mutationFn: (payload: ApplicationRequest) => submitApplication(payload),
  });
}
