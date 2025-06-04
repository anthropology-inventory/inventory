import React, { useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { BsTrash3Fill } from 'react-icons/bs'

const Sidebar = ({ specimens, setSearchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = React.useState('')
  // Here will be the categories the user created
  const [categories, setCategories] = React.useState([])
  // The following will create a popup with then the user can type what they want to add
  const [showCreateCategory, setCreateCategory] = React.useState(false)
  const [newCategoryName, setNewCategoryName] = React.useState('')
  // For deleting
  const [isDeleting, setIsDeleting] = React.useState(false)
  // LOCAL STORAGE
  const LOCAL_STORAGE_KEY = 'userCategories'

  // addCategory creates a new category with the current categories and adds to the localstorage
  const addCategory = () => {
    const trimmedName = newCategoryName.trim()
    if (trimmedName && !categories.includes(trimmedName)) {
      const updated = [...categories, trimmedName]
      setCategories((prev) => [...prev, trimmedName])
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    }
    setNewCategoryName('')
    setCreateCategory(false)
  }

  // filter the categories where the category includes the searchTerm
  const filterValues = (values) =>
    values.filter((value) =>
      (value?.toString().toLowerCase() || '').includes(localSearchTerm.toLowerCase())
    )

  // handleSearchSelection of the category search bar which setSearchTerm
  const handleSearchSelection = (value) => {
    setSearchTerm(value)
  }

  // Handles the category for deleting and deletes from the localstorage
  const handleDeleteCategory = (categoryToDelete) => {
    setIsDeleting(true)
    const updated = categories.filter((cat) => cat !== categoryToDelete)
    setCategories((prev) => prev.filter((cat) => cat !== categoryToDelete))
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    setIsDeleting(false)
  }

  // Load categories from localStorage when loaded
  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
    setCategories(savedCategories)
  }, [])

  return (
    <div className="sidebar">
      <div className="add-category">
        {!showCreateCategory ? (
          <button className="btn-add-category" onClick={() => setCreateCategory(true)}>
            + Add Category
          </button>
        ) : (
          <></>
        )}
        {showCreateCategory && (
          <div className="create-category">
            <input
              className="categories-search-bar"
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New category name..."
            />
            <div>
              <button className="btn-create" onClick={addCategory}>
                Create
              </button>
              <button className="btn-cancel" onClick={() => setCreateCategory(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Categories search bar */}
      <div>
        <input
          className="categories-search-bar"
          type="text"
          placeholder="Category Search..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories list where the values will be added to the category you set */}
      <ul className="categories">
        {filterValues(categories).map((label, i) => (
          <li key={i} onClick={() => handleSearchSelection(label)}>
            <span>{label}</span>
            <Tooltip title="Delete Category" placement="top" arrow>
              <IconButton
                color="error"
                size="medium"
                onClick={(e) => {
                  e.stopPropagation() // prevents triggering <li>'s onClick
                  handleDeleteCategory(label)
                }}
                disabled={isDeleting}
              >
                <BsTrash3Fill />
              </IconButton>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
