import type { AxiosError } from 'axios';

export function getApiErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Something went wrong.';
  }

  const axiosError = error as AxiosError<{ detail?: string }>;
  return axiosError.response?.data?.detail ?? axiosError.message ?? 'Something went wrong.';
}
