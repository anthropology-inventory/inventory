import PropTypes from 'prop-types'
import Select from 'react-select'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { BsInfoCircle } from 'react-icons/bs'

const defaultSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#fdf8f0',
    border: `1px solid ${state.isFocused ? 'var(--teal)' : 'var(--border-warm)'}`,
    borderRadius: 'var(--radius-sm)',
    minHeight: 'calc(var(--input-height) + 6px)',
    boxShadow: 'none',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'var(--text-base)',
    '&:hover': {
      borderColor: 'var(--teal)'
    },
    cursor: 'pointer',
  }),

  option: (baseStyles, state) => ({
    ...baseStyles,

    backgroundColor: state.isFocused
      ? 'var(--bg-card)'
      : 'var(--cream)',

    color: 'var(--text-dark)',

    fontFamily: "'DM Sans', sans-serif",

    cursor: 'pointer',
  }),

  valueContainer: (base) => ({
    ...base,
    padding: '10px 12px'
  }),

  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0
  })
}

function FormSelect({
  label,
  selectName,
  isRequired,
  isMulitple,
  selectValue,
  changeFunc,
  placeholderTxt,
  selectOptions,
  selectStyles,
  selectClass,
  hasTooltip,
  tooltipTxt,
  hint,
  disable
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
      <Select
        name={selectName}
        required={isRequired}
        value={selectOptions.find((option) => option.value === selectValue)}
        onChange={(selectedOption) => changeFunc(selectedOption, selectName)}
        isMulti={isMulitple}
        placeholder={placeholderTxt}
        options={selectOptions}
        styles={defaultSelectStyles}
        className={selectClass}
        isDisabled={disable}
      />
      {hint && <small className="hint">{hint}</small>}
    </section>
  )
}

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  selectName: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isMulitple: PropTypes.bool,
  selectValue: PropTypes.any.isRequired,
  changeFunc: PropTypes.func.isRequired,
  placeholderTxt: PropTypes.string,
  selectOptions: PropTypes.array.isRequired,
  selectStyles: PropTypes.any,
  selectClass: PropTypes.any,
  hasTooltip: PropTypes.bool,
  tooltipTxt: PropTypes.string,
  hint: PropTypes.string,
  disable: PropTypes.bool
}

export default FormSelect
