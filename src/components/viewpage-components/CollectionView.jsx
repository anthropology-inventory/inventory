import React, { useState } from 'react'
import SpecimenCard from './SpecimenCard'
import SpecimenRow from './SpecimenRow'

const CollectionView = ({ specimens, viewType, onDelete }) => {
  // Sorting settings
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  })

  // tableColumns of which category we want to see for the list view as there are... A LOT of columns XD
  const tableColumns = ['nickName', 'genus', 'species', 'anthropologist', 'location']

  // The default basic sort
  const sortedSpecimens = [...specimens].sort((a, b) => {
    // This is unique as we don't need to sort the image
    if (!sortConfig.key || sortConfig.key === 'image') return 0

    let valA = a[sortConfig.key] || ''
    let valB = b[sortConfig.key] || ''

    if (!isNaN(valA) && !isNaN(valB)) {
      valA = Number(valA)
      valB = Number(valB)
    } else {
      valA = valA.toString().toLowerCase()
      valB = valB.toString().toLowerCase()
    }

    return sortConfig.direction === 'asc' ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1
  })

  // handling the sort and switching the direction if clicking the same column
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  // Returns the grid or list depending on the viewType
  // Grid cards have links to the ID when clicked
  return viewType === 'grid' ? (
    <div className="grid-view">
      {sortedSpecimens.map((specimen) => (
        <div key={specimen._id} className="specimen-card-container">
          <SpecimenCard specimen={specimen} onDelete={onDelete} />
        </div>
      ))}
    </div>
  ) : (
    <table className="list-view">
      <thead>
        <tr>
          <th className="image-header">Image</th>
          {tableColumns.map((key, i) => (
            <th key={i} className={key} onClick={() => handleSort(key)}>
              {/* replaces underline to space */}
              {key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}{' '}
              {sortConfig.key === key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedSpecimens.map((specimen) => (
          <SpecimenRow key={specimen._id} specimen={specimen} tableColumns={tableColumns} />
        ))}
      </tbody>
    </table>
  )
}

export default CollectionView
