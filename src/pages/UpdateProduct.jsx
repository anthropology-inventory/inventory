import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getArtifactById, updateArtifact } from '../utils/api'
import { ToastContainer, toast, Bounce } from 'react-toastify'

import { manufacturerOptions, materialOptions, countryOptions } from '../assets/forms/selectOptions'
import { selectStyles } from '../assets/forms/selectStyles'
import '../styles/form-styles.css'
import Select from 'react-select'

const UpdateProduct = () => {
  const { id } = useParams() // Get artifact ID from URL
  const [formData, setFormData] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(true)
  // Errors
  const [errors, setErrors] = useState({})

  // Fetch artifact details on mount
  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const artifact = await getArtifactById(id)
        if (!artifact) {
          toast.error('Artifact not found.', {
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
          setLoading(false)
          return
        }
        setFormData(artifact)
        if (artifact.image) setPreview(artifact.image)
      } catch (err) {
        toast.error('Failed to load artifact data.', {
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
      }
      setLoading(false)
    }

    fetchArtifact()
  }, [id])

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

    const input = validateInput(e.target.name, e.target.value)
    setErrors(input)
    if (Object.keys(input).length === 0) {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, and WEBP images are allowed.', {
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
      return
    }

    setFormData({ ...formData, file })
    setPreview(URL.createObjectURL(file))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedArtifact = await updateArtifact(id, formData)
    if (updatedArtifact) {
      toast.success('Artifact Updated 😄', {
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
    } else {
      toast.error('Failed to update artifact.', {
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
    }
  }

  const handleSelectChange = (selectedOption, { name }) => {
    const input = validateInput(name, selectedOption.value)
    setErrors(input)

    if (Object.keys(input).length === 0) {
      setFormData((prev) => ({ ...prev, [name]: selectedOption.value }))
    }
  }

  if (loading) return <p>Loading artifact details...</p>

  return (
    <form onSubmit={handleSubmit} id="update-form">
      <ToastContainer />

      <h2 className="form-title">Update Artifact</h2>

      <fieldset className="specimen-info">
        <h3>Specimen Information</h3>
        <section>
          <label>Genus</label>
          <input
            type="text"
            id="genus"
            name="genus"
            placeholder="e.g. Homo"
            required
            value={formData.genus}
            onChange={handleChange}
            className={!errors.genus && formData.genus != '' ? 'valid' : ''}
          />
          {errors.genus && <small className="validation-err">{errors.genus}</small>}
        </section>
        <section>
          <label>Species</label>
          <input
            type="text"
            id="species"
            name="species"
            placeholder="e.g. Sapiens"
            required
            value={formData.species}
            onChange={handleChange}
            className={!errors.species && formData.species != '' ? 'valid' : ''}
          />
        </section>
        <section>
          <label>Nickname (optional)</label>
          <input
            type="text"
            name="nickName"
            placeholder="e.g. Lucy"
            value={formData.nickName}
            onChange={handleChange}
          />
        </section>
        <section>
          <label>Specimen ID</label>
          <input
            type="text"
            name="specimenId"
            placeholder="e.g. AL288-1"
            required
            value={formData.specimenId}
            onChange={handleChange}
            className={!errors.specimenId && formData.specimenId != '' ? 'valid' : ''}
          />
        </section>
      </fieldset>
      <fieldset className="discovery-details">
        <h3>Discovery Details</h3>
        <section>
          <label>Lead Anthropoligst</label>
          <input
            type="text"
            name="anthropologist"
            placeholder="e.g. Dr. Donald Johanson"
            value={formData.anthropologist}
            onChange={handleChange}
            className={!errors.anthropologist && formData.anthropologist != '' ? 'valid' : ''}
          />
        </section>
        <section>
          <label>Region Found</label>
          <input
            type="text"
            name="regionFound"
            placeholder="e.g. Afar Triangle"
            value={formData.regionFound}
            onChange={handleChange}
          />
        </section>
        <section>
          <label>Country Found</label>
          <Select
            id="countryFound"
            name="countryFound"
            value={countryOptions.find((option) => option.value === formData.countryFound)}
            onChange={handleSelectChange}
            options={countryOptions}
            styles={selectStyles}
          />
        </section>
      </fieldset>
      <fieldset className="description-notes">
        <h3>Description & Notes</h3>
        <section>
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Cabinet 1, row 2"
            required
            value={`${formData.cabinet}, ${formData.row}`}
            // onChange={handleChange}
          />
          <small className="tooltip">Physical location artifact is stored.</small>
        </section>
        <section id="description-section">
          <label>Description (optional)</label>
          <textarea
            name="description"
            placeholder="e.g. Discovered during 1974 excavation in..."
            value={formData.description}
            onChange={handleChange}
          />
        </section>
        <section id="notes-section">
          <label>Notes (optional)</label>
          <textarea
            name="notes"
            placeholder="e.g. Consider purchasing..."
            value={formData.notes}
            onChange={handleChange}
          />
        </section>
      </fieldset>
      <fieldset className="manufacturing-details">
        <h3>Manufacturing Details</h3>
        <section>
          <label>Material</label>
          <Select
            id="material"
            name="material"
            value={materialOptions.find((option) => option.value === formData.material)}
            onChange={handleSelectChange}
            className={!errors.material && formData.material != '' ? 'valid' : ''}
            options={materialOptions}
            styles={selectStyles}
          />
        </section>
        <section>
          <label>Manufacturer</label>
          <Select
            id="manufacturer"
            name="manufacturer"
            value={manufacturerOptions.find((option) => option.value === formData.manufacturer)}
            onChange={handleSelectChange}
            className={!errors.manufacturer && formData.manufacturer != '' ? 'valid' : ''}
            options={manufacturerOptions}
            styles={selectStyles}
          />
        </section>
        <section>
          <label>Manufacturer ID</label>
          <input
            type="text"
            name="manufacturerId"
            placeholder="e.g. BC-001"
            value={formData.manufacturerId}
            onChange={handleChange}
          />
        </section>
        <section>
          <label>Country Manufactured</label>
          <Select
            id="countryManufactured"
            name="countryManufactured"
            value={countryOptions.find((option) => option.value === formData.countryManufactured)}
            onChange={handleSelectChange}
            className={
              !errors.countryManufactured && formData.countryManufactured != '' ? 'valid' : ''
            }
            options={countryOptions}
            styles={selectStyles}
          />
        </section>
      </fieldset>
      <fieldset className="purchase-info">
        <h3>Acquisition Information</h3>
        <section>
          <label>Date of Purchase (optional)</label>
          <input
            type="date"
            name="dateOfPurchase"
            value={formData.dateOfPurchase}
            onChange={handleChange}
          />
        </section>
        <section>
          <label>Purchaser (optional)</label>
          <input
            type="text"
            name="purchaser"
            placeholder="e.g. Madeleine Tessandori"
            value={formData.purchaser}
            onChange={handleChange}
          />
        </section>
        <section>
          <label>Cost (optional)</label>
          <input
            type="number"
            name="paidValue"
            placeholder="e.g. 250.00"
            value={formData.paidValue}
            onChange={handleChange}
          />
          <small className="tooltip">Amount paid for the specimen.</small>
        </section>
        <section>
          <label>Current Value (optional)</label>
          <input
            type="number"
            name="activeValue"
            placeholder="e.g. 325.00"
            value={formData.activeValue}
            onChange={handleChange}
          />
          <small className="tooltip">Current value of the specimen.</small>
        </section>
      </fieldset>
      <fieldset className="file-upload">
        <h3>Photo Upload</h3>
        <section>
          <label htmlFor="fileInput" className="file-label">
            {preview ? (
              <img src={preview} alt="Preview" className="file-preview" />
            ) : (
              <div className="file-placeholder">
                <div>📁+</div>
                <p>Upload Photo</p>
              </div>
            )}
          </label>
          <input type="file" name="image" id="fileInput" onChange={handleFileChange} hidden />
        </section>
      </fieldset>

      <button type="submit" className="submit-button">
        Update
      </button>
    </form>
  )
}

export default UpdateProduct
