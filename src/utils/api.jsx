import { normalizeLocation } from './locationFormatter'

// const PORT = 3001
// const API_URI = `http://localhost:` + PORT + `/api/specimens/`
const API_URI = import.meta.env.VITE_API_URI || import.meta.env.VITE_API_BASE_URI

const token = localStorage.getItem('token')

const normalizeArtifact = (artifact) => {
  if (!artifact || typeof artifact !== 'object' || Array.isArray(artifact)) {
    return artifact
  }

  return {
    ...artifact,
    location: normalizeLocation(artifact.location)
  }
}

const normalizeArtifacts = (artifacts) => {
  if (!Array.isArray(artifacts)) {
    return artifacts
  }

  return artifacts.map(normalizeArtifact)
}

const appendArtifactField = (form, key, value) => {
  if (value === null || value === '') {
    return
  }

  if (key === 'image') {
    if (value instanceof File) {
      form.append('image', value)
    }
    return
  }

  if (key === 'location') {
    form.append(key, typeof value === 'object' ? JSON.stringify(value) : value)
    return
  }

  form.append(key, value)
}

export const fetchArtifacts = async () => {
  try {
    const res = await fetch(API_URI + '/api/specimens', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) {
      console.log('Error fetching artifacts')
    }
    const data = await res.json()
    return normalizeArtifacts(data)
  } catch (err) {
    console.error('Failed to fetch artifacts:', err)
  }
}

export const fetchTotalRecords = async () => {
  try {
    const response = await fetch(API_URI + '/api/specimens/totalRecords', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      console.log('Error fetching total number of records')
    }
    const data = await response.json()
    return data.count
  } catch (error) {
    console.log('Error fetching total number of records')
    return 0
  }
}

export const fetchAllArtifactsByCategory = async (category) => {
  try {
    const response = await fetch(API_URI + '/api/specimens/totalByCategory/' + category, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      console.log('Error fetching total number of artifacts in the ' + category + ' category')
    }
    const data = await response.json()
    return data.count
  } catch (error) {
    console.log('Error fetching total number of artifacts in the ' + category + ' category')
    return 0
  }
}

export const fetchTotalCost = async () => {
  try {
    const response = await fetch(API_URI + '/api/specimens/totalCost', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      console.log('Error fetching total cost')
    }
    const data = await response.json()
    return Number(data.totalCost).toLocaleString()
  } catch (error) {
    console.log('Error fetching total cost')
    return 0
  }
}

export const fetchCurrentValue = async () => {
  try {
    const response = await fetch(API_URI + '/api/specimens/currentVal', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      console.log('Error fetching collection value')
    }
    const data = await response.json()
    return Number(data.currentVal).toLocaleString()
  } catch (error) {
    console.error('Error fetching collection value', error)
    return 0
  }
}

export const fetchRecentSpecimens = async () => {
  try {
    const response = await fetch(API_URI + '/api/specimens/recent', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      console.error('Error fetching recent specimens:', response.error)
    }
    const recentSpecimens = await response.json()
    return recentSpecimens.data
  } catch (error) {
    console.error('Error fetching recent specimens:', error)
    return []
  }
}

export const addArtifact = async (formData) => {
  try {
    const form = new FormData()

    Object.keys(formData).forEach((key) => {
      appendArtifactField(form, key, formData[key])
    })

    const response = await fetch(API_URI + '/api/specimens/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
      body: form
    })

    if (!response.ok) {
      console.log('Error adding artifact')
    }

    const data = await response.json()
    return normalizeArtifact(data)
  } catch (error) {
    console.log('Error fetching total cost')
    return null
  }
}

export const getArtifactById = async (id) => {
  try {
    const response = await fetch(API_URI + '/api/specimens/' + id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      console.log('Error fetching artifact with ID:', id)
      return null
    }
    return normalizeArtifact(await response.json())
  } catch (error) {
    console.log('Error fetching artifact:', error)
    return null
  }
}

export const updateArtifact = async (id, formData) => {
  try {
    const form = new FormData()

    Object.keys(formData).forEach((key) => {
      appendArtifactField(form, key, formData[key])
    })

    const response = await fetch(API_URI + '/api/specimens/' + id, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
      body: form
    })

    if (!response.ok) {
      console.log('Error updating artifact with ID:', id)
      return null
    }

    return normalizeArtifact(await response.json())
  } catch (error) {
    console.log('Error updating artifact:', error)
    return null
  }
}

// DetailsPage
export const fetchSpecimenById = async (id) => {
  try {
    const response = await fetch(`${API_URI}/api/specimens/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch specimen')
    }
    const data = await response.json()
    return normalizeArtifact(data)
  } catch (error) {
    console.error('Error fetching specimen:', error)
    return null
  }
}

export const saveNotesToLocalStorage = (id, notes) => {
  localStorage.setItem(`notes-${id}`, notes)
}

export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URI}/api/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })

    return res
  } catch (err) {
    console.log(err)
  }
}

export const signup = async (email, password, isAdmin = false) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URI}/api/signup`, {
      method: 'POST',
      body: JSON.stringify({ email, password, isAdmin }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    let data = {}
    try {
      data = await res.json()
    } catch (error) {
      data = { message: 'Unexpected response while creating user.' }
    }

    return { ok: res.ok, data }
  } catch (err) {
    console.log(err)
    return { ok: false, data: { message: 'Network error while creating user.' } }
  }
}

export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URI}/api/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      console.log('Error fetching users')
      return []
    }

    return await res.json()
  } catch (err) {
    console.log(err)
    return []
  }
}

export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URI}/api/users/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      console.log('Error fetching user with ID:', id)
      return null
    }

    return await res.json()
  } catch (err) {
    console.log(err)
    return null
  }
}

export const updateUser = async (id, updates) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URI}/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    let data = {}
    try {
      data = await res.json()
    } catch (error) {
      data = { message: 'Unexpected response while updating user.' }
    }

    return { ok: res.ok, data }
  } catch (err) {
    console.log(err)
    return { ok: false, data: { message: 'Network error while updating user.' } }
  }
}

export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URI}/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    let data = {}
    try {
      data = await res.json()
    } catch (error) {
      data = { message: 'Unexpected response while deleting user.' }
    }

    return { ok: res.ok, data }
  } catch (err) {
    console.log(err)
    return { ok: false, data: { message: 'Network error while deleting user.' } }
  }
}
