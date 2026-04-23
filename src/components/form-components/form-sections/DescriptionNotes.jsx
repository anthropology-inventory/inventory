import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import FormFieldset from '../FormFieldset'
import FormTextarea from '../FormTextarea'
import FormSelect from '../FormSelect'
import { selectStyles } from '../../../assets/forms/selectStyles'
import { cabinetOptions, drawerOptions, shelfOptions } from '../../../assets/forms/selectOptions'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { BsInfoCircle } from 'react-icons/bs'
import { normalizeLocation } from '../../../utils/locationFormatter'

function DescriptionNotes({
  locationData,
  descriptionData,
  notesData,
  changeFunc,
  selectChangeFunc
}) {
  const [storageType, setStorageType] = useState('')
  const [selectedCabinet, setSelectedCabinet] = useState('')
  const [selectedShelf, setSelectedShelf] = useState('')
  const [selectedDrawer, setSelectedDrawer] = useState('')

  useEffect(() => {
    const location = normalizeLocation(locationData?.value)

    if (!location) {
      setStorageType('')
      setSelectedCabinet('')
      setSelectedShelf('')
      setSelectedDrawer('')
      return
    }

    if (typeof location === 'string') {
      if (location.startsWith('Drawer')) {
        setStorageType('drawer')
        setSelectedDrawer(location)
        setSelectedCabinet('')
        setSelectedShelf('')
        return
      }

      setStorageType('')
      setSelectedCabinet('')
      setSelectedShelf('')
      setSelectedDrawer('')
      return
    }

    if (location.cabinet && location.shelf) {
      setStorageType('cabinet')
      setSelectedCabinet(location.cabinet)
      setSelectedShelf(location.shelf)
      setSelectedDrawer('')
      return
    }

    if (location.drawer) {
      setStorageType('drawer')
      setSelectedDrawer(location.drawer)
      setSelectedCabinet('')
      setSelectedShelf('')
      return
    }

    setStorageType('')
    setSelectedCabinet('')
    setSelectedShelf('')
    setSelectedDrawer('')
  }, [locationData])

  const resetLocation = () => {
    setSelectedCabinet('')
    setSelectedShelf('')
    setSelectedDrawer('')
    selectChangeFunc({ value: null }, 'location')
  }

  const handleStorageTypeChange = (e) => {
    setStorageType(e.target.value)
    resetLocation()
  }

  const handleCabinetSelect = (selectedOption) => {
    const cabinet = selectedOption?.value || ''

    setSelectedCabinet(cabinet)
    setSelectedShelf('')

    if (!cabinet) {
      selectChangeFunc({ value: null }, 'location')
      return
    }

    selectChangeFunc({ value: null }, 'location')
  }

  const handleShelfSelect = (selectedOption) => {
    const shelf = selectedOption?.value || ''

    setSelectedShelf(shelf)

    if (!selectedCabinet || !shelf) {
      selectChangeFunc({ value: null }, 'location')
      return
    }

    selectChangeFunc({ value: { cabinet: selectedCabinet, shelf } }, 'location')
  }

  const handleDrawerSelect = (selectedOption) => {
    const drawer = selectedOption?.value || ''

    setSelectedDrawer(drawer)

    if (!drawer) {
      selectChangeFunc({ value: null }, 'location')
      return
    }

    selectChangeFunc({ value: { drawer } }, 'location')
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
                id="location-cabinet"
                value="cabinet"
                name="storageType"
                onChange={handleStorageTypeChange}
                checked={storageType === 'cabinet'}
              />
              <label htmlFor="location-cabinet">Cabinet</label>
            </div>
            <div className="radio-btn">
              <input
                type="radio"
                id="location-drawer"
                value="drawer"
                name="storageType"
                onChange={handleStorageTypeChange}
                checked={storageType === 'drawer'}
              />
              <label htmlFor="location-drawer">Drawer</label>
            </div>
          </div>
        </div>,
        ...(storageType === 'cabinet'
          ? [
              <FormSelect
                key="cabinet-select"
                label="Cabinet"
                selectName="cabinet"
                selectValue={selectedCabinet}
                selectOptions={cabinetOptions}
                changeFunc={handleCabinetSelect}
                selectStyles={selectStyles(!!selectedCabinet)}
                hasTooltip={true}
                tooltipTxt="Select the cabinet number."
                isRequired={true}
              />,
              <FormSelect
                key="shelf-select"
                label="Shelf"
                selectName="shelf"
                selectValue={selectedShelf}
                selectOptions={shelfOptions}
                changeFunc={handleShelfSelect}
                selectStyles={selectStyles(!!selectedShelf)}
                hasTooltip={true}
                tooltipTxt="Select the shelf number."
                isRequired={true}
                disable={!selectedCabinet}
              />
            ]
          : []),
        ...(storageType === 'drawer'
          ? [
              <FormSelect
                key="drawer-select"
                label="Drawer"
                selectName="drawer"
                selectValue={selectedDrawer}
                selectOptions={drawerOptions}
                changeFunc={handleDrawerSelect}
                selectStyles={selectStyles(!!selectedDrawer)}
                hasTooltip={true}
                tooltipTxt="Select the drawer number."
                isRequired={true}
              />
            ]
          : []),
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
