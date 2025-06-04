// SpecimenCard is a component that shows in grid view
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { BsPencilSquare, BsTrash3Fill } from 'react-icons/bs'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import PlaceholderImg from '../../assets/images/Image-not-found.png'
import {button} from '../../styles/CustomThemes'
import { ThemeProvider, Box } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'

const SpecimenCard = ({ specimen, onDelete }) => {
  // Card Menu Btns
  const [isDeleting, setIsDeleting] = useState(false)

  // DELETE target card that user clicked the trash button
  const handleDelete = async () => {
    // A window to double check if you really REALLY want to delete this specimen
    
    return (
      toast.info(({closeToast}) => (
        <div>
          Are you sure you want to delete this artifact?
          <Box id="delete-popup">
            <ThemeProvider theme={button}>
              <Button 
                variant='contained'
                color="back"
                onClick={closeToast}>
                No, don't delete
              </Button>
              <Button
                variant='contained'
                color="delete"
                onClick={() => {
                  console.log('Deleted!');
                  closeToast();
                }}
              >
                Yes, delete this artifact
              </Button>
            </ThemeProvider>
          </Box>
        </div>
      ), {
        position: 'top-center',
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
      })
    )
    // if (!window.confirm('Are you sure you want to delete this specimen? THERE IS NO UNDO!')) return

    // setIsDeleting(true) // Extra protection for the delete btn

    // const API_URI = import.meta.env.VITE_API_BASE_URI

    // const token = localStorage.getItem('token')

    // try {
    //   const response = await fetch(`${API_URI}/api/specimens/${specimen._id}`, {
    //     method: 'DELETE',
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'application/json'
    //     }
    //   })

    //   const data = await response.json()

    //   if (response.ok) {
    //     // makes sure that onDelete is defined
    //     if (onDelete) onDelete(specimen._id)
    //   } else {
    //     throw new Error(data.message || 'Failed to delete specimen.')
    //   }
    // } catch (error) {
    //   console.error('Error deleting specimen:', error)
    //   alert(error.message)
    // } finally {
    //   setIsDeleting(false)
    // }
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
              <Link to={`/UpdateProduct/${specimen._id}`}>
                <IconButton
                  color="edit"
                  size='medium'
                >
                  <BsPencilSquare/>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Delete artifact" placement="top" arrow>
              <IconButton 
                color="delete"
                size="medium"
                onClick={handleDelete} 
                disabled={isDeleting}
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

export default SpecimenCard
