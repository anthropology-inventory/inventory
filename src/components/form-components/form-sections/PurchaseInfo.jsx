import PropTypes from 'prop-types'
import FormFieldset from '../FormFieldset'
import FormInput from '../FormInput'

function PurchaseInfo({ dateData, purchaserData, paidData, activeValData, changeFunction }) {
  return (
    <FormFieldset
      fieldsetID={'purchase-info'}
      title={'Acquisition Information'}
      isOptional={true}
      fields={[
        <FormInput
          key={'dateOfPurchase'}
          label={'Date of Purchase (optional)'}
          inputType={'date'}
          inputName={'dateOfPurchase'}
          isRequired={false}
          inputValue={dateData.value}
          changeFunc={changeFunction}
          inputClass={dateData.value === '' ? '' : dateData.errors ? 'invalid' : 'valid'}
          validationErr={dateData.errors}
        />,
        <FormInput
          key={'purchaser'}
          label={'Purchaser (optional)'}
          inputType={'text'}
          inputName={'purchaser'}
          placeholderTxt={'e.g. Madeleine Tessandori'}
          isRequired={false}
          inputValue={purchaserData.value}
          changeFunc={changeFunction}
          inputClass={purchaserData.value === '' ? '' : purchaserData.errors ? 'invalid' : 'valid'}
          validationErr={purchaserData.errors}
        />,
        <FormInput
          key={'paidValue'}
          label={'Cost (optional)'}
          inputType={'number'}
          inputName={'paidValue'}
          placeholderTxt={'e.g. 250.00'}
          isRequired={false}
          value={paidData.value}
          changeFunc={changeFunction}
          inputClass={paidData.value === 0 ? '' : paidData.errors ? 'invalid' : 'valid'}
          hint={"Numeric value only -- exclude '$' symbol."}
          validationErr={paidData.errors}
          hasTooltip={true}
          tooltipTxt={'Amount paid for artifact.'}
        />,
        <FormInput
          key={'currentValue'}
          label={'Current Value (optional)'}
          inputType={'number'}
          inputName={'activeValue'}
          placeholderTxt={'e.g. 250.00'}
          isRequired={false}
          value={activeValData.value}
          changeFunc={changeFunction}
          inputClass={activeValData.value === 0 ? '' : activeValData.errors ? 'invalid' : 'valid'}
          hint={"Numeric value only -- exclude '$' symbol."}
          validationErr={activeValData.errors}
          hasTooltip={true}
          tooltipTxt={'Current value of the artifact.'}
        />
      ]}
    />
  )
}

PurchaseInfo.propTypes = {
  dateData: PropTypes.object,
  purchaserData: PropTypes.string,
  paidData: PropTypes.number,
  activeValData: PropTypes.number,
  changeFunction: PropTypes.func
}

export default PurchaseInfo
