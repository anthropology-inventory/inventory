import PropTypes from 'prop-types'
import FormFieldset from '../FormFieldset'
import FormTextarea from '../FormTextarea'
import FormSelect from '../FormSelect'
import { selectStyles } from '../../../assets/forms/selectStyles'
import { drawerOptions } from '../../../assets/forms/selectOptions'

function DescriptionNotes({
  locationData,
  descriptionData,
  notesData,
  changeFunc,
  selectChangeFunc
}) {
  const handleDrawerSelect = (selectedOption) => {
    if (selectedOption?.value) {
      selectChangeFunc({ value: { drawer: selectedOption.value } }, 'location')
      return
    }

    selectChangeFunc({ value: null }, 'location')
  }

  const getCurrentDrawer = () => {
    const location = locationData?.value

    if (!location) return ''

    if (typeof location === 'object' && typeof location.drawer === 'string') {
      return location.drawer
    }

    if (typeof location === 'string' && location.startsWith('Drawer')) {
      return location
    }

    return ''
  }

  const currentDrawer = getCurrentDrawer()
  
  return (
    <FormFieldset
      fieldsetID="description-notes"
      title="Description & Notes"
      fields={[
        <FormSelect
          key="drawer-select"
          label="Drawer"
          selectName="drawer"
          selectValue={currentDrawer}
          selectOptions={drawerOptions}
          changeFunc={handleDrawerSelect}
          selectStyles={selectStyles(!!currentDrawer)}
          hasTooltip={true}
          tooltipTxt="Select the drawer number."
          isRequired={true}
        />,
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
