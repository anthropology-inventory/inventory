import { useState, useEffect } from 'react'
import { addArtifact, getArtifactById, updateArtifact } from '../../utils/api'
import { validateInput } from '../../utils/add_artifact_validation'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { useParams } from 'react-router-dom'

import {
  manufacturerOptions,
  materialOptions,
  countryOptions
} from '../../assets/forms/selectOptions'
import { selectStyles } from '../../assets/forms/selectStyles'

import '../../styles/form-styles.css'
import PurchaseInfo from '../../components/form-components/form-sections/PurchaseInfo'
import FormInput from '../../components/form-components/FormInput'
import FormFieldset from '../../components/form-components/FormFieldset'
import FormSelect from '../../components/form-components/FormSelect'
import DiscoveryDetails from '../../components/form-components/form-sections/DiscoveryDetails'
import DescriptionNotes from '../../components/form-components/form-sections/DescriptionNotes'
import PhotoUpload from '../../components/form-components/PhotoUpload'

const FossilForm = ({ mode = 'add', artifactId }) => {
  // Gets the id from the params or the artifact id, a double check for getting the correct ID if there
  const { id: paramId } = useParams()
  const id = artifactId || paramId
  const [preview, setPreview] = useState(null) // For previewing the image

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

  useEffect(() => {
    if (mode === 'update' && id) {
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
          }

          setFormData(artifact)

          // If there is an artifact image, we'll show the preview
          if (artifact.image) {
            setPreview(artifact.image)
          }
        } catch (err) {
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
        } finally {
          setLoading(false)
        }
      }
      fetchArtifact()
    }
  }, [id, mode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setTouched({ ...touched, [name]: value })

    const input = validateInput(name, value)
    setErrors({ ...errors, [name]: input[name] || '' })
  }

  const handleSelectChange = (selectedOption, name) => {
    // const input = validateInput(name, selectedOption.value)
    // setErrors(input)
    if (Array.isArray(selectedOption)) {
      const cabinet = selectedOption.find((opt) => opt.value.startsWith('Cabinet'))
      const row = selectedOption.find((opt) => opt.value.startsWith('Row'))

      const filteredSelection = []
      if (cabinet) filteredSelection.push(cabinet)
      if (row) filteredSelection.push(row)

      const combinedLocation = [cabinet?.value, row?.value].filter(Boolean).join(', ')

      setFormData((prev) => ({ ...prev, [name]: combinedLocation }))
      console.log(formData.location)
    } else {
      setFormData((prev) => ({ ...prev, [name]: selectedOption.value }))
      console.log(formData.location)
    }

    // if (Object.keys(input).length === 0) {
    //   setFormData((prev) => ({ ...prev, [name]: selectedOption.value }))
    // }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const hasValidationErrors = Object.values(errors).some(Boolean)
    if (hasValidationErrors) {
      console.log('Form has validation errors')
      console.log(errors)
      return // prevent form submission if errors exist
    }

    // add or update artifact depending on mode
    const result = mode === 'add' ? await addArtifact(formData) : await updateArtifact(id, formData)

    if (result) {
      console.log('Submitted Data:', formData)
      toast.success(`Artifact ${mode === 'add' ? 'Added' : 'Updated'} 😄`, {
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
    } else {
      toast.error(`Failed to ${mode === 'add' ? 'add' : 'update'} artifact.`, {
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
    <form onSubmit={handleSubmit} id="fossil-form" autoComplete="on">
      <ToastContainer />
      <h2 className="form-title">{mode === 'add' ? 'Add Fossil' : 'Update Artifact'}</h2>
      <FormFieldset
        fieldsetID={'specimen-info'}
        title={'Specimen Information'}
        fields={[
          <FormInput
            key={'genus'}
            label={'Genus'}
            inputType={'text'}
            inputName={'genus'}
            placeholderTxt={'e.g. Homo'}
            isRequired={true}
            inputValue={formData.genus}
            changeFunc={handleChange}
            inputClass={formData.genus === '' ? '' : errors.genus ? 'invalid' : 'valid'}
            validationErr={errors.genus}
          />,
          <FormInput
            key={'species'}
            label={'Species'}
            inputType={'text'}
            inputName={'species'}
            placeholderTxt={'e.g. Sapiens'}
            isRequired={true}
            inputValue={formData.species}
            changeFunc={handleChange}
            inputClass={formData.species === '' ? '' : errors.species ? 'invalid' : 'valid'}
            validationErr={errors.species}
          />,
          <FormInput
            key={'nickname'}
            label={'Nickname (optional)'}
            inputType={'text'}
            inputName={'nickName'}
            placeholderTxt={'e.g. Lucy'}
            isRequired={false}
            inputValue={formData.nickName}
            changeFunc={handleChange}
            inputClass={formData.nickName === '' ? '' : errors.nickName ? 'invalid' : 'valid'}
            validationErr={errors.nickName}
          />,
          <FormInput
            key={'specimenId'}
            label={'Specimen ID'}
            inputType={'text'}
            inputName={'specimenId'}
            placeholderTxt={'e.g. AL288-1'}
            isRequired={true}
            inputValue={formData.specimenId}
            changeFunc={handleChange}
            inputClass={formData.specimenId === '' ? '' : errors.specimenId ? 'invalid' : 'valid'}
            validationErr={errors.specimenId}
          />
        ]}
      />
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
        selectChangeFunc={handleSelectChange}
      />
      <FormFieldset
        fieldsetID="manufacturing-details"
        title="Manufacturing Details"
        isOptional={true}
        fields={[
          <FormSelect
            key="manufacturer"
            label="Manufacturer (optional)"
            selectName="manufacturer"
            isRequired={false}
            selectValue={formData.manufacturer}
            changeFunc={handleSelectChange}
            selectOptions={manufacturerOptions}
            selectStyles={selectStyles(!!formData.manufacturer)}
            selectClass={!errors.manufacturer && formData.manufacturer !== '' ? 'valid' : ''}
          />,
          <FormInput
            key="manufacturerId"
            label="Manufacturer ID (optional)"
            inputType="text"
            inputName="manufacturerId"
            placeholderTxt="e.g. BC-001"
            isRequired={false}
            inputValue={formData.manufacturerId}
            changeFunc={handleChange}
            inputClass={
              formData.manufacturerId === '' ? '' : errors.manufacturerId ? 'invalid' : 'valid'
            }
            validationErr={errors.manufacturerId}
          />,
          <FormSelect
            key="material"
            label="Material (optional)"
            selectName="material"
            isRequired={false}
            selectValue={formData.material}
            changeFunc={handleSelectChange}
            selectOptions={materialOptions}
            selectStyles={selectStyles(!!formData.material)}
            selectClass={!errors.material && formData.material !== '' ? 'valid' : ''}
          />,
          <FormSelect
            key="countryManufactured"
            label="Country Manufactured (optional)"
            selectName="countryManufactured"
            isRequired={false}
            selectValue={formData.countryManufactured}
            changeFunc={handleSelectChange}
            selectOptions={countryOptions}
            selectStyles={selectStyles(!!formData.countryManufactured)}
            selectClass={
              !errors.countryManufactured && formData.countryManufactured !== '' ? 'valid' : ''
            }
          />
        ]}
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
        fields={[
          <PhotoUpload
            key={'photoupload'}
            formData={formData}
            setFormData={setFormData}
            preview={preview}
            setPreview={setPreview}
          />
        ]}
      />
      <button type="submit" id="submit-btn">
        {mode === 'add' ? 'Add to collection' : 'Update to collection'}
      </button>
    </form>
  )
}

export default FossilForm
