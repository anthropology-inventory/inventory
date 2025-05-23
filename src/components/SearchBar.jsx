import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import '../styles/searchbar-styles.css'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [specimens, setSpecimens] = useState([])
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const navigate = useNavigate()

  const API_BASE_URL = `http://localhost:3001`

  useEffect(() => {
    const fetchSpecimens = async () => {
      const response = await fetch(`${API_BASE_URL}/api/specimens`)
      const json = await response.json()

      if (response.ok) {
        setSpecimens(json)
      }
    }

    fetchSpecimens()
  }, [])

  // console.log(specimens)

  // const debounce = (func, delay) => {
  //   let timeoutId
  //   return (...args) => {
  //     clearTimeout(timeoutId)
  //     timeoutId = setTimeout(() => func(...args), delay)
  //   }
  // }

  // const handleSearch = useCallback(
  //   debounce((term) => {
  //     if (term.trim() === '') {
  //       setSearchResults([])
  //     } else {
  //       const results = specimens.filter((specimen) =>
  //         specimen.description.toLowerCase().includes(term.toLowerCase())
  //       )
  //       setSearchResults(results)
  //     }
  //   }, 300),
  //   [specimens]
  // )

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
