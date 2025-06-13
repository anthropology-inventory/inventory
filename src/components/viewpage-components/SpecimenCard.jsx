// SpecimenCard is a component that shows in grid view
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { BsPencilSquare, BsTrash3Fill } from 'react-icons/bs'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import PlaceholderImg from '../../assets/images/Image-not-found.png'
import {button} from '../../styles/CustomThemes'
import { ThemeProvider, Box } from '@mui/material'
import { toast } from 'react-toastify'

const SpecimenCard = ({ specimen, onDelete }) => {
  const handleDelete = async () => {
    console.log('You clicked delete!')
    toast(({closeToast}) => (
      <div id="delete-popup-content">
        <BsTrash3Fill id='trash-icon'/>
        <p>Are you sure you want to delete this artifact?</p>
        <Box id="delete-popup">
          <ThemeProvider theme={button}>
            <Button 
              variant='contained'
              color="back"
              onClick={closeToast}>
              No, keep it
            </Button>
            <Button
              variant='contained'
              color="delete"
              onClick={() => {
                deleteArtifact(specimen, onDelete)
                closeToast();
              }}
            >
              Yes, delete it
            </Button>
          </ThemeProvider>
        </Box>
      </div>
    ), {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      className: "confirm-delete-popup"
    })
  }

  return (
    <div className="specimen-card">
      <Link className="specimen-link" to={`/specimen/${specimen._id}`}>
        <div className="specimen-img">
          <img
            src={
              specimen.images?.[0]
                ? specimen.images[0]
                : PlaceholderImg
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
          <ThemeProvider theme={button}>
            <Tooltip title="Edit artifact" placement="top" arrow>
              <Link to={`/UpdateArtifact/${specimen._id}`}>
                <IconButton
                  color="edit"
                  size='small'
                >
                  <BsPencilSquare/>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Delete artifact" placement="top" arrow>
              <IconButton 
                color="delete"
                size="small"
                onClick={handleDelete} 
              >
                <BsTrash3Fill />
              </IconButton>
            </Tooltip>
          </ThemeProvider>
        </div>
      </div>
    </div>
  )
}

SpecimenCard.propTypes = {
  specimen: PropTypes.any,
  onDelete: PropTypes.func
}

const deleteArtifact = async (specimen, onDelete) => {
  const API_URI = import.meta.env.VITE_API_BASE_URI
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${API_URI}/api/specimens/${specimen._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (response.ok) {
      if (onDelete) onDelete(specimen._id)
    } else {
      throw new Error(data.message || 'Failed to delete specimen.')
    }
  } catch (error) {
    console.error('Error deleting specimen:', error)
    alert(error.message)
  }
}

export default SpecimenCard
