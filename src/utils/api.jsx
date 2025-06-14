// const PORT = 3001
// const API_URI = `http://localhost:` + PORT + `/api/specimens/`
const API_URI = import.meta.env.VITE_API_BASE_URI

const token = localStorage.getItem('token')

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
    return data
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
      if (formData[key] !== null && formData[key] !== '') {
        form.append(key, formData[key])
      }
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
    return data
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
    return await response.json()
  } catch (error) {
    console.log('Error fetching artifact:', error)
    return null
  }
}

export const updateArtifact = async (id, formData) => {
  try {
    const form = new FormData()

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== '') {
        // Only append the image if it's a File
        if (key === 'image') {
          if (formData.image instanceof File) {
            form.append('image', formData.image)
          }
        } else {
          form.append(key, formData[key])
        }
      }
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

    return await response.json()
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
    return data
  } catch (error) {
    console.error('Error fetching specimen:', error)
    return null
  }
}

export const saveNotesToLocalStorage = (id, notes) => {
  localStorage.setItem(`notes-${id}`, notes)
}

// Users - users will be hardcoded
// export const signup = async (email, password) => {
//   try {
//     const res = await fetch('http://localhost:3001/api/signup', {
//       method: 'POST',
//       body: JSON.stringify({ email, password }),
//       headers: { 'Content-Type': 'application/json' }
//     })

//     return res.json()
//   } catch (err) {
//     console.log(err)
//   }
// }

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
