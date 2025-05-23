import PropTypes from 'prop-types'
import { useState } from 'react'
import FormFieldset from '../FormFieldset'
import FormInput from '../FormInput'
import FormTextarea from '../FormTextarea'
import FormSelect from '../FormSelect'
import { selectStyles } from '../../../assets/forms/selectStyles'
import { cabinetAndRowOptions, drawerOptions } from '../../../assets/forms/selectOptions'
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
  const handleChange = (e) => {
    const value = e.target.value
    setLocationType(value)
  }
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
                id="cabinet-row"
                value="cabinet-row"
                name="locationType"
                onChange={handleChange}
              />
              <label>Cabinet & Row</label>
            </div>
            <div className="radio-btn">
              <input
                type="radio"
                id="drawer"
                value="drawer"
                name="locationType"
                onChange={handleChange}
              />
              <label>Drawer</label>
            </div>
            <div className="radio-btn">
              <input
                type="radio"
                id="shelf"
                value="shelf"
                name="locationType"
                onChange={handleChange}
              />
              <label>Shelf</label>
            </div>
          </div>
        </div>,
        locationDropdown(locationType, locationData, selectChangeFunc),
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

function locationDropdown(selection, locationData, selectChangeFunc) {
  if (selection == 'cabinet-row') {
    return (
      <FormSelect
        label="Cabinet & Row"
        selectName="location"
        isMulitple={true}
        selectValue={locationData.value}
        selectOptions={cabinetAndRowOptions}
        changeFunc={selectChangeFunc}
        selectStyles={selectStyles(!!locationData.value.length > 0)}
        hasTooltip={true}
        tooltipTxt="Cabinet and row numbers the artifact is stored."
        hint="Select both a cabinet and row."
      />
    )
  } else if (selection == 'drawer') {
    return (
      <FormSelect
        label="Drawer"
        selectName="location"
        selectValue={locationData.value}
        selectOptions={drawerOptions}
        changeFunc={selectChangeFunc}
        selectStyles={selectStyles(!!locationData.value)}
        hasTooltip={true}
        tooltipTxt="Drawer number the artifact is stored."
      />
    )
  } else if (selection == 'shelf') {
    return (
      <FormSelect
        label="Shelf"
        selectName="location"
        selectValue="Shelf"
        selectOptions={[{ label: 'Shelf', value: 'Shelf' }]}
        changeFunc={selectChangeFunc}
        selectStyles={selectStyles(true)}
        hasTooltip={true}
        tooltipTxt="Shelf the artifact is stored."
        disable={true}
      />
    )
  }
}

DescriptionNotes.propTypes = {
  locationData: PropTypes.object,
  descriptionData: PropTypes.string.isRequired,
  notesData: PropTypes.string.isRequired,
  changeFunc: PropTypes.func.isRequired,
  selectChangeFunc: PropTypes.func.isRequired
}

export default DescriptionNotes
