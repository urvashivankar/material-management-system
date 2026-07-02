export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'API request failed')
  }

  return response.json()
}

export async function getMaterials(page = 1, limit = 10, search = '') {
  const params = new URLSearchParams({ page: String(page), limit: String(limit), search })
  return fetchAPI(`/api/materials?${params}`)
}

export async function getCustomers(page = 1, limit = 10, search = '') {
  const params = new URLSearchParams({ page: String(page), limit: String(limit), search })
  return fetchAPI(`/api/customers?${params}`)
}

export async function getSuppliers(page = 1, limit = 10, search = '') {
  const params = new URLSearchParams({ page: String(page), limit: String(limit), search })
  return fetchAPI(`/api/suppliers?${params}`)
}

export async function getVehicles(page = 1, limit = 10, search = '') {
  const params = new URLSearchParams({ page: String(page), limit: String(limit), search })
  return fetchAPI(`/api/vehicles?${params}`)
}

export async function getDashboardStats() {
  return fetchAPI('/api/dashboard/stats')
}

export async function logout() {
  return fetchAPI('/api/auth/logout', { method: 'POST' })
}
