import PropTypes from 'prop-types'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { BsInfoCircle } from 'react-icons/bs'

function FormInput({
  label,
  inputType,
  inputId,
  inputName,
  placeholderTxt,
  isRequired,
  inputValue,
  changeFunc,
  inputClass,
  hint,
  hasTooltip,
  tooltipTxt,
  validationErr
}) {
  return (
    <section>
      <div id="input-head">
        <label>{label}</label>
        {hasTooltip && (
          <Tooltip title={tooltipTxt} placement="right-end" arrow>
            <IconButton id="tooltip-btn">
              <BsInfoCircle id="tooltip-icon" />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <input
        type={inputType}
        id={inputId}
        name={inputName}
        placeholder={placeholderTxt}
        required={isRequired}
        value={inputValue}
        onChange={changeFunc}
        className={inputClass}
      />

      {hint && <small className="hint">{hint}</small>}
      {validationErr && <small className="validation-err">{validationErr}</small>}
    </section>
  )
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  inputId: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  placeholderTxt: PropTypes.string,
  isRequired: PropTypes.bool,
  inputValue: PropTypes.string.isRequired,
  changeFunc: PropTypes.func.isRequired,
  inputClass: PropTypes.string,
  hint: PropTypes.string,
  hasTooltip: PropTypes.bool,
  tooltipTxt: PropTypes.string,
  validationErr: PropTypes.string
}

export default FormInput
