import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import FormFieldset from '../FormFieldset'
import FormTextarea from '../FormTextarea'
import FormSelect from '../FormSelect'
import { selectStyles } from '../../../assets/forms/selectStyles'
import { cabinetOptions, shelfOptions, drawerOptions } from '../../../assets/forms/selectOptions'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { BsInfoCircle } from 'react-icons/bs'

function DescriptionNotes({
  locationData,
  descriptionData,
  notesData,
  changeFunc,
  selectChangeFunc
}) {
  const [locationType, setLocationType] = useState('')
  const [selectedCabinet, setSelectedCabinet] = useState(null)

  // Initialize location type from existing data
  useEffect(() => {
    if (locationData && locationData.value) {
      const loc = locationData.value
      if (typeof loc === 'object' && loc.cabinet) {
        if (loc.shelf) {
          setLocationType('cabinet-shelf')
          setSelectedCabinet({ value: loc.cabinet, label: loc.cabinet })
        } else if (loc.drawer) {
          setLocationType('cabinet-drawer')
          setSelectedCabinet({ value: loc.cabinet, label: loc.cabinet })
        }
      }
    }
  }, [locationData])

  const handleLocationTypeChange = (e) => {
    const value = e.target.value
    setLocationType(value)
    setSelectedCabinet(null)
    // Reset location data
    selectChangeFunc({ value: null }, 'location')
  }

  const handleCabinetSelect = (selectedOption) => {
    setSelectedCabinet(selectedOption)
    // Pass cabinet selection to parent
    selectChangeFunc({ 
      value: { cabinet: selectedOption.value, [locationType === 'cabinet-shelf' ? 'shelf' : 'drawer']: null },
      cabinetOnly: true 
    }, 'location')
  }

  const handleShelfOrDrawerSelect = (selectedOption) => {
    if (!selectedCabinet) return
    
    const locationObj = {
      cabinet: selectedCabinet.value,
      ...(locationType === 'cabinet-shelf' 
        ? { shelf: selectedOption.value }
        : { drawer: selectedOption.value }
      )
    }
    selectChangeFunc({ value: locationObj }, 'location')
  }

  const getLocationDisplayValue = () => {
    if (!locationData || !locationData.value) return null
    const loc = locationData.value
    if (typeof loc === 'object' && loc.cabinet) {
      return loc
    }
    return null
  }

  const currentLocation = getLocationDisplayValue()
  
  return (
    <FormFieldset
      fieldsetID="description-notes"
      title="Description & Notes"
      fields={[
        <div key="locations" id="locations">
          <label id="location-label">Location</label>
          <Tooltip title="Physical location of the artifact" placement="right-end" arrow>
            <IconButton id="tooltip-btn">
              <BsInfoCircle id="tooltip-icon" />
            </IconButton>
          </Tooltip>
          <div id="location-radio-btns">
            <div className="radio-btn">
              <input
                type="radio"
                id="cabinet-shelf"
                value="cabinet-shelf"
                name="locationType"
                onChange={handleLocationTypeChange}
                checked={locationType === 'cabinet-shelf'}
              />
              <label>Cabinet & Shelf</label>
            </div>
            <div className="radio-btn">
              <input
                type="radio"
                id="cabinet-drawer"
                value="cabinet-drawer"
                name="locationType"
                onChange={handleLocationTypeChange}
                checked={locationType === 'cabinet-drawer'}
              />
              <label>Cabinet & Drawer</label>
            </div>
          </div>
        </div>,
        ...(locationType ? [
          <div key="cabinet-select">
            <FormSelect
              label="Cabinet"
              selectName="cabinet"
              selectValue={selectedCabinet}
              selectOptions={cabinetOptions}
              changeFunc={handleCabinetSelect}
              selectStyles={selectStyles(!!selectedCabinet)}
              hasTooltip={true}
              tooltipTxt="Select the cabinet number."
              isRequired={true}
            />
          </div>
        ] : []),
        ...(locationType && selectedCabinet ? [
          <div key="shelf-drawer-select">
            <FormSelect
              label={locationType === 'cabinet-shelf' ? 'Shelf' : 'Drawer'}
              selectName={locationType === 'cabinet-shelf' ? 'shelf' : 'drawer'}
              selectValue={
                currentLocation 
                  ? (locationType === 'cabinet-shelf' 
                      ? { value: currentLocation.shelf, label: currentLocation.shelf }
                      : { value: currentLocation.drawer, label: currentLocation.drawer }
                    )
                  : null
              }
              selectOptions={locationType === 'cabinet-shelf' ? shelfOptions : drawerOptions}
              changeFunc={handleShelfOrDrawerSelect}
              selectStyles={selectStyles(
                !!(locationType === 'cabinet-shelf' 
                  ? currentLocation?.shelf 
                  : currentLocation?.drawer)
              )}
              hasTooltip={true}
              tooltipTxt={`Select the ${locationType === 'cabinet-shelf' ? 'shelf' : 'drawer'} number.`}
              isRequired={true}
            />
          </div>
        ] : []),
        <FormTextarea
          key="description"
          label="Description (optional)"
          textareaName="description"
          placeholderTxt="e.g. Discovered during 1974 excavation in..."
          textareaValue={descriptionData}
          changeFunc={changeFunc}
        />,
        <FormTextarea
          key="notes"
          label="Notes (optional)"
          textareaName="notes"
          placeholderTxt="e.g. Consider purchasing..."
          textareaValue={notesData}
          changeFunc={changeFunc}
        />
      ]}
    />
  )
}

DescriptionNotes.propTypes = {
  locationData: PropTypes.object,
  descriptionData: PropTypes.string.isRequired,
  notesData: PropTypes.string.isRequired,
  changeFunc: PropTypes.func.isRequired,
  selectChangeFunc: PropTypes.func.isRequired
}

export default DescriptionNotes
