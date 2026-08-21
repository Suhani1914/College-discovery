import { useMutation } from '@tanstack/react-query'
import { predictColleges } from '../api/predictor'

export function usePredictor() {
  return useMutation({
    mutationFn: predictColleges,
  })
}