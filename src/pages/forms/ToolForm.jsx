import { useState } from 'react'
import { addArtifact } from '../../utils/api'
import { validateInput } from '../../utils/add_artifact_validation'
import { ToastContainer, toast, Bounce } from 'react-toastify'

import '../../styles/form-styles.css'
import PurchaseInfo from '../../components/form-components/form-sections/PurchaseInfo'
import FormFieldset from '../../components/form-components/FormFieldset'
import DiscoveryDetails from '../../components/form-components/form-sections/DiscoveryDetails'
import DescriptionNotes from '../../components/form-components/form-sections/DescriptionNotes'
import PhotoUpload from '../../components/form-components/PhotoUpload'

const ToolForm = () => {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [formData, setFormData] = useState({
    category: 'Fossil',
    genus: '',
    species: '',
    nickName: '',
    specimenId: '',
    material: '',
    manufacturerId: '',
    manufacturer: '',
    countryManufactured: '',
    anthropologist: '',
    activeValue: 0,
    paidValue: 0,
    dateOfPurchase: '',
    purchaser: '',
    regionFound: '',
    countryFound: '',
    location: '',
    description: '',
    notes: '',
    image: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setTouched({ ...touched, [name]: value })

    const input = validateInput(name, value)
    setErrors({ ...errors, [name]: input[name] || '' })
  }

  const handleSelectChange = (selectedOption, name) => {
    const input = validateInput(name, selectedOption.value)
    setErrors(input)

    if (Object.keys(input).length === 0) {
      setFormData((prev) => ({ ...prev, [name]: selectedOption.value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const hasValidationErrors = Object.values(errors).some(Boolean)
    if (hasValidationErrors) {
      console.log('Form has validation errors')
      console.log(errors)
      return // prevent form submission if errors exist
    }
    const result = await addArtifact(formData)
    if (result) {
      console.log('Submitted Data:', formData)
      toast.success('Artifact Added 😄', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} id="tool-form" autoComplete="on">
      <ToastContainer />
      <h2 className="form-title">Add Tool (non-weaponry)</h2>
      <DiscoveryDetails
        anthropologistData={{ value: formData.anthropologist, errors: errors.anthropologist }}
        regionData={{ value: formData.regionFound, errors: errors.regionFound }}
        countryData={formData.countryFound}
        changeFunc={handleChange}
        selectChangeFunc={handleSelectChange}
      />
      <DescriptionNotes
        locationData={{ value: formData.location, errors: errors.location }}
        descriptionData={formData.description}
        notesData={formData.notes}
        changeFunc={handleChange}
      />
      <PurchaseInfo
        dateData={{ value: formData.dateOfPurchase, errors: errors.dateOfPurchase }}
        purchaserData={{ value: formData.purchaser, errors: errors.purchaser }}
        paidData={{ value: formData.paidValue, errors: errors.paidValue }}
        activeValData={{ value: formData.activeValue, errors: errors.activeValue }}
        changeFunction={handleChange}
      />
      <FormFieldset
        fieldsetID={'file-upload'}
        title={'Photo Upload'}
        fields={[<PhotoUpload key={'photoupload'} formData={formData} setFormData={setFormData} />]}
      />
      <button type="submit" id="submit-btn">
        Add to collection
      </button>
    </form>
  )
}

export default ToolForm