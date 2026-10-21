export const tokenStorageKey = 'homework11.accessToken'

export function getTokenExpirationDelay(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
    if (typeof payload.exp === 'number') {
      return Math.min(Math.max(0, payload.exp * 1000 - Date.now()), 2_147_483_647)
    }
  } catch {
    return 0
  }
  return 0
}
