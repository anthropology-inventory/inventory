// SpecimenCard is a component that shows in grid view
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { BsPencilSquare, BsTrash3Fill } from 'react-icons/bs'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

const SpecimenCard = ({ specimen, onDelete }) => {
  // Card Menu Btns
  const [isDeleting, setIsDeleting] = useState(false)

  // DELETE target card that user clicked the trash button
  const handleDelete = async () => {
    // A window to double check if you really REALLY want to delete this specimen
    if (!window.confirm('Are you sure you want to delete this specimen? THERE IS NO UNDO!')) return

    setIsDeleting(true) // Extra protection for the delete btn

    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`http://localhost:3001/api/specimens/${specimen._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        // makes sure that onDelete is defined
        if (onDelete) onDelete(specimen._id)
      } else {
        throw new Error(data.message || 'Failed to delete specimen.')
      }
    } catch (error) {
      console.error('Error deleting specimen:', error)
      alert(error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="specimen-card">
      <Link className="specimen-link" to={`/specimen/${specimen._id}`}>
        <div className="specimen-img">
          <img
            src={
              specimen.images?.[0]
                ? `http://localhost:3001${specimen.images[0]}`
                : 'http://localhost:3001/uploads/image-not-found.jpg'
            }
            alt={specimen.nickName || 'Unknown Specimen'}
            className="specimen-image"
          />
        </div>
      </Link>
      <div className="specimen-info">
        <h3>{specimen.nickName ? specimen.nickName : specimen.genus + ' ' + specimen.species}</h3>
        <p>{specimen.specimenId}</p>
        <div className="specimen-card-btns">
          <Tooltip title="Edit artifact" placement="top" arrow>
            <IconButton id="edit-btn">
              <BsPencilSquare />
              <Link className="specimen-card-btns-update" to={`/UpdateProduct/${specimen._id}`}>
                Update
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete artifact" placement="top" arrow>
            <IconButton id="delete-btn" onClick={handleDelete} disabled={isDeleting}>
              <BsTrash3Fill />
              Delete
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

SpecimenCard.propTypes = {
  specimen: PropTypes.any,
  onDelete: PropTypes.func
}

export default SpecimenCard
