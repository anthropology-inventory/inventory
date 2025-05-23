import { useState } from 'react'
import { addArtifact } from '../../utils/api'
import { validateInput } from '../../utils/add_artifact_validation'
import { ToastContainer, toast, Bounce } from 'react-toastify'

import Select from 'react-select'

import '../../styles/form-styles.css'
import PurchaseInfo from '../../components/form-components/form-sections/PurchaseInfo'
import FormFieldset from '../../components/form-components/FormFieldset'
import DiscoveryDetails from '../../components/form-components/form-sections/DiscoveryDetails'
import DescriptionNotes from '../../components/form-components/form-sections/DescriptionNotes'
import PhotoUpload from '../../components/form-components/PhotoUpload'

const StoneToolForm = () => {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    category: 'Stone Tool',
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
    cabinet: 'C1',
    row: 'R1',
    description: '',
    notes: '',
    image: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const input = validateInput(name, value)
    setErrors(input)
    if (Object.keys(input).length === 0) {
      setFormData({ ...formData, [name]: value })
    }
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
    if (Object.keys(errors).length > 0) {
      console.log('Form has validation errors')
      return // prevent form submission if errors exist
    }
    const result = await addArtifact(formData)
    if (result) {
      console.log('Submitted Data:', formData)
      toast.success('Artifact Added 😄', {
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

  return (
    <form onSubmit={handleSubmit} id="stoneTool-form" autoComplete="on">
      <ToastContainer />
      <h2 className="form-title">Add Stone Tool</h2>
      <DiscoveryDetails
        anthropologistData={formData.anthropologist}
        anthropologistError={errors.anthropologist}
        regionData={formData.regionFound}
        countryData={formData.countryFound}
        changeFunc={handleChange}
        selectChangeFunc={handleSelectChange}
      />
      <DescriptionNotes
        descriptionData={formData.description}
        notesData={formData.notes}
        changeFunc={handleChange}
      />
      <PurchaseInfo
        dateData={formData.dateOfPurchase}
        purchaserData={formData.purchaser}
        purchaserErrors={errors.purchaser}
        paidData={formData.paidValue}
        paidErrors={errors.paidValue}
        activeValData={formData.activeValue}
        activeValErrors={errors.activeValue}
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

export default StoneToolForm
