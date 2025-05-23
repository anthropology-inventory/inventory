import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Select from 'react-select'
import FossilForm from './forms/FossilForm.jsx'
import PotteryForm from './forms/PotteryForm.jsx'
import WeaponryForm from './forms/WeaponryForm.jsx'
import ToolForm from './forms/ToolForm.jsx'
import StoneToolForm from './forms/StoneToolForm.jsx'
import { categoryOptions } from '../assets/forms/selectOptions.jsx'
import { selectStyles } from '../assets/forms/selectStyles.jsx'
import { getArtifactById } from '../utils/api'
import { ToastContainer, toast, Bounce } from 'react-toastify'

export default function AddArtifact() {
  const { id } = useParams() // Gets the id from the params if there for update
  const isUpdate = !!id // !!id makes it true if there is an id, otherwise false
  const [loading, setLoading] = useState(isUpdate)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // If it's an update mode, we'll fetch for the artifact by the id params
  useEffect(() => {
    if (isUpdate) {
      const fetchArtifact = async () => {
        try {
          const artifact = await getArtifactById(id)
          if (artifact?.category) {
            setSelectedCategory(artifact.category)
          }
        } catch (err) {
          toast.error('Failed to fetch artifact category.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce
          })
        } finally {
          setLoading(false)
        }
      }
      fetchArtifact()
    }
  }, [id, isUpdate])

  const handleChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value)
  }

  const renderForm = () => {
    if (!selectedCategory) return null

    // add the props to the component for use for check if add or update product mode
    const props = {
      mode: isUpdate ? 'update' : 'add',
      artifactId: id
    }

    switch (selectedCategory) {
      case 'Fossil':
        return <FossilForm {...props} />
      case 'Pottery':
        return <PotteryForm {...props} />
      case 'Weaporny':
        return <WeaponryForm {...props} />
      case 'Tool (non-weaponry)':
        return <ToolForm {...props} />
      case 'Stone Tool':
        return <StoneToolForm {...props} />
    }
  }

  // Required for loading in data form the update otherwise break :D
  if (loading) return <p>Loading...</p>

  return (
    <>
      <ToastContainer />
      <fieldset id="category-select">
        <h3>Category Select</h3>
        <section>
          <label>Category</label>
          <Select
            id="category"
            name="category"
            placeholder="Select a category..."
            required
            onChange={handleChange}
            value={categoryOptions.find((option) => option.value === selectedCategory)}
            options={categoryOptions}
            styles={selectStyles(!!selectedCategory)}
          />
          <small className="hint">Category of artifact being added.</small>
        </section>
      </fieldset>
      {renderForm()}
    </>
  )
}
