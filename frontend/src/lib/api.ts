const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(errorText || `HTTP ${res.status}`)
  }

  return res.json()
}

export const api = {
  login: (email: string, password: string) =>
    fetchAPI('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () =>
    fetchAPI('/api/auth/logout', {
      method: 'POST',
    }),
  me: () => fetchAPI('/api/auth/me'),
}
