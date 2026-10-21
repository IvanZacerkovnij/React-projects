export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function request<Result>(path: string, options: RequestInit = {}): Promise<Result> {
  let response: Response
  try {
    response = await fetch(`/api/v1/${path}`, options)
  } catch {
    throw new Error('Не вдалося з’єднатися із сервером. Спробуйте ще раз.')
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    const validationErrors = body?.errors ? Object.values(body.errors).flat().join(' ') : ''
    throw new ApiError(body?.message || validationErrors || 'Не вдалося виконати запит.', response.status)
  }
  return response.status === 204 ? undefined as Result : response.json()
}


