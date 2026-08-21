import { apiFetch } from './client'
import type { PredictorRequest, PredictorResponse } from '../types/college'

export function predictColleges(
  payload: PredictorRequest
): Promise<PredictorResponse> {
  return apiFetch('/predictor', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}