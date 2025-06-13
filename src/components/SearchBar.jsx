import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import '../styles/searchbar-styles.css'
import { useNavigate } from 'react-router-dom'

const SearchBar = (props) => {
  // If parent passed searchTerm and setSearchTerm it will unlock the live filtering otherwise, we'll only use this search bar for the drop down. For example, inventory for unlock and dashboard for dropdown
  // If there is no searchTerm or setSearchTerm, we'll set the searchTerm & setSearchTerm to ' '
  const isControlled = props.searchTerm !== undefined && props.setSearchTerm !== undefined
  const [internalSearchTerm, setInternalSearchTerm] = useState('')
  const searchTerm = isControlled ? props.searchTerm : internalSearchTerm
  const setSearchTerm = isControlled ? props.setSearchTerm : setInternalSearchTerm

  // const [searchTerm, setSearchTerm] = useState('')
  const [specimens, setSpecimens] = useState([])
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const navigate = useNavigate()

  const API_URI = import.meta.env.VITE_API_BASE_URI
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchSpecimens = async () => {
      const response = await fetch(`${API_URI}/api/specimens`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()

      if (response.ok) {
        setSpecimens(json)
      }
    }

    fetchSpecimens()
  }, [])

  // Shows the data of what the user types in the search bar and shows a dropdown of 5 to select from
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSuggestions([])
    } else {
      // Will search the data from anything in the data properties
      const filtered = specimens.filter((specimen) =>
        Object.values(specimen).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      // Sets how many shows up in the dropdown
      setFilteredSuggestions(filtered.slice(0, 5))
    }
  }, [searchTerm, specimens])

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim() !== '') {
      navigate(`/SpecimensExplorer?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleSuggestionClick = (desc) => {
    navigate(`/SpecimensExplorer?search=${encodeURIComponent(desc)}`)
  }

  return (
    <>
      <form id="searchbar-form" onSubmit={handleSubmit}>
        <div id="searchbar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search by nickname, genus, species..."
          />
          <button type="submit">
            <Search size={20} />
          </button>
          {filteredSuggestions.length > 0 && (
            <ul className="search-dropdown">
              {filteredSuggestions.map((specimen) => (
                <li
                  key={specimen._id}
                  onClick={() => handleSuggestionClick(specimen.nickName || searchTerm)}
                >
                  {specimen.nickName || '[No Nickname]'}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </>
  )
}

export default SearchBar
