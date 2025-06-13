import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IconButton, Tooltip, Box } from '@mui/material'
import { BsFillGridFill, BsListUl } from 'react-icons/bs'
import { fetchArtifacts } from '../utils/api.jsx'
import AddArtifactBtn from '../components/button-components/AddArtifactBtn.jsx'

// Components
import Sidebar from '../components/viewpage-components/Sidebar'
import CollectionView from '../components/viewpage-components/CollectionView.jsx'

// CSS
import '../styles/index.css'
import '../styles/specimensExplorer.css'
import SearchBar from '../components/SearchBar.jsx'

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
      try {
        const data = await fetchArtifacts()
        setSpecimens(data)
        setFetchError(null)
      } catch (error) {
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
        <Box sx={{ display: 'flex' }}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <AddArtifactBtn />
        </Box>

        <div className="view-controls" id="grid-list-toggle" onClick={toggleView}>
          <Tooltip title="Grid view" arrow>
            <IconButton className={viewType === 'grid' ? 'active' : ''}>
              <BsFillGridFill />
            </IconButton>
          </Tooltip>
          <Tooltip title="List view" arrow>
            <IconButton className={viewType === 'list' ? 'active' : ''}>
              <BsListUl />
            </IconButton>
          </Tooltip>
        </div>
        {fetchError ? (
          <h1 className="error">{fetchError}</h1>
        ) : (
          <CollectionView
            key={location.key}
            specimens={filteredSpecimens}
            viewType={viewType}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}
