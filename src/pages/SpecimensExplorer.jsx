import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// Components
import Sidebar from '../components/viewpage-components/Sidebar'
import CollectionView from '../components/viewpage-components/CollectionView.jsx'

// CSS
import '../styles/index.css'
import '../styles/specimensExplorer.css'
import { Link } from 'react-router-dom'

export default function View() {
  const [searchTerm, setSearchTerm] = useState('') // For inventory search bar
  const [viewType, setViewType] = useState('grid') // Grid or list
  const [specimens, setSpecimens] = useState([]) // specimens which we will fetch from the database
  const [fetchError, setFetchError] = useState(null)

  const location = useLocation()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const query = params.get('search')
    if (query) {
      setSearchTerm(query)
    }
  }, [location.search])

  // Load up will fetches for the specimens which should return a json for us to use and show to the view page
  useEffect(() => {
    const fetchSpecimens = async () => {
      const token = localStorage.getItem('token')

      // try to get a response from the api
      try {
        const response = await fetch('http://localhost:3001/api/specimens', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch specimens')
        }
        const data = await response.json()
        setSpecimens(data)
        setFetchError(null) // If there is an error, we'll reset since it's now fixed
      } catch (error) {
        // otherwise we'll use a default which might be removed later and display an error
        console.error('Error fetching specimens, using default data:', error)
        setFetchError('Failed to load specimens. Please try again later.')
      }
    }
    fetchSpecimens()
  }, [])

  // Filters each specimens if it includes the search bar value,
  // Should work with any column
  const filteredSpecimens = specimens.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Toggles grid or list view
  const toggleView = () => {
    setViewType((prev) => (prev === 'grid' ? 'list' : 'grid'))
  }

  // HandlesDelete so that when a user deletes a card it will update the page and remove it :)
  const handleDelete = (id) => {
    setSpecimens((prevSpecimens) => prevSpecimens.filter((specimen) => specimen._id !== id))
  }

  return (
    <div className="view-page">
      <Sidebar specimens={specimens} setSearchTerm={setSearchTerm} />

      <div className="specimens-view-container">
        <div className="view-add-btn">
          <Link to={`/AddArtifact`}>Add Product</Link>
        </div>

        <div className="view-controls">
          <input
            type="text"
            placeholder="Inventory Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button id="grid-list-toggle" type="button" onClick={toggleView}>
            <img
              src="http://localhost:3001/svg/grid.svg"
              alt="Grid Icon"
              id="grid-view"
              className={viewType === 'grid' ? 'active' : ''}
            />
            <img
              src="http://localhost:3001/svg/list.svg"
              alt="List Icon"
              id="list-view"
              className={viewType === 'list' ? 'active' : ''}
            />
          </button>
        </div>

        {/* error message if fetch fails */}
        {fetchError ? (
          <h1 className="error">{fetchError}</h1>
        ) : (
          <CollectionView
            specimens={filteredSpecimens}
            viewType={viewType}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}
