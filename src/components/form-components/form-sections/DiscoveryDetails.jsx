import PropTypes from 'prop-types'
import FormFieldset from '../FormFieldset'
import FormInput from '../FormInput'
import { countryOptions } from '../../../assets/forms/selectOptions'
import { selectStyles } from '../../../assets/forms/selectStyles'
import FormSelect from '../FormSelect'

function DiscoveryDetails({
  anthropologistData,
  regionData,
  countryData,
  changeFunc,
  selectChangeFunc
}) {
  return (
    <FormFieldset
      fieldsetID={'discovery-details'}
      title={'Discovery Details'}
      fields={[
        <FormInput
          key={'anthropologist'}
          label={'Lead Anthropologist (optional)'}
          inputType={'text'}
          inputName={'anthropologist'}
          placeholderTxt={'e.g. Donald Johanson'}
          isRequired={false}
          inputValue={anthropologistData.value}
          changeFunc={changeFunc}
          inputClass={
            anthropologistData.value === '' ? '' : anthropologistData.errors ? 'invalid' : 'valid'
          }
          validationErr={anthropologistData.errors}
        />,
        <FormInput
          key={'regionFound'}
          label={'Site/Region Found'}
          inputType={'text'}
          inputName={'regionFound'}
          placeholderTxt={'e.g. Afar Triangle'}
          isRequired={false}
          value={regionData.value}
          changeFunc={changeFunc}
          inputClass={regionData.value === '' ? '' : regionData.errors ? 'invalid' : 'valid'}
          validationErr={regionData.errors}
        />,
        <FormSelect
          key={'country found'}
          label={'Country Found'}
          selectName="countryFound"
          selectValue={countryData}
          changeFunc={selectChangeFunc}
          selectOptions={countryOptions}
          selectStyles={selectStyles(!!countryData)}
        />
      ]}
    />
  )
}

DiscoveryDetails.propTypes = {
  anthropologistData: PropTypes.object,
  regionData: PropTypes.object,
  countryData: PropTypes.string,
  changeFunc: PropTypes.func,
  selectChangeFunc: PropTypes.func
}

export default DiscoveryDetails
