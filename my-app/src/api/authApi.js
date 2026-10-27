const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

function normalizeRole(role) {
  const roleMap = {
    'Event organizer': 'organizer',
    'Event attendee': 'attendee',
    'Community builder': 'community_builder',
    organizer: 'organizer',
    attendee: 'attendee',
    community_builder: 'community_builder',
  }

  return roleMap[role] || 'organizer'
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Request failed')
  }

  return data
}

export async function signupUser({ name, email, password, role }) {
  return requestJson(`${API_BASE_URL}/accounts/signup/`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password,
      role: normalizeRole(role),
    }),
  })
}

export async function signinUser({ email, password, remember = false }) {
  return requestJson(`${API_BASE_URL}/accounts/login/`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      remember,
    }),
  })
}

export async function signoutUser() {
  return requestJson(`${API_BASE_URL}/accounts/logout/`, {
    method: 'POST',
  })
}

export async function getCurrentUser() {
  return requestJson(`${API_BASE_URL}/accounts/me/`, {
    method: 'GET',
  })
}
