import React from 'react'

const Sidebar = ({ specimens, setSearchTerm }) => {
  const [searchTerm, setLocalSearchTerm] = React.useState('')
  // Here will be the categories the user created
  const [categories, setCategories] = React.useState([])
  // The following will create a popup with then the user can type what they want to add
  const [showCreateCategory, setCreateCategory] = React.useState(false)
  const [newCategoryName, setNewCategoryName] = React.useState('')

  // addCategory creates a new category with the current categories
  const addCategory = () => {
    const trimmedName = newCategoryName.trim()
    if (trimmedName && !categories.includes(trimmedName)) {
      setCategories((prev) => [...prev, trimmedName])
    }
    setNewCategoryName('')
    setCreateCategory(false)
  }

  // filter the categories where the category includes the searchTerm
  const filterValues = (values) =>
    values.filter((value) =>
      (value?.toString().toLowerCase() || '').includes(searchTerm.toLowerCase())
    )

  // handleSearchSelection of the category search bar which setSearchTerm
  const handleSearchSelection = (value) => {
    setSearchTerm(value)
  }

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
          value={searchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories list where the values will be added to the category you set */}
      <ul className="categories">
        {filterValues(categories).map((label, i) => (
          <li key={i} onClick={() => handleSearchSelection(label)}>
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
