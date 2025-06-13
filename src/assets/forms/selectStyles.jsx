/**
 * Generates custom style overrides for a react-select component based on whether an option is selected.
 * This function customizes the appearance of the control (input box) and dropdown options.
 *
 * @function selectStyles
 * @param {boolean} isSelected - Indicates whether the current field is selected or active. Affects border and background styling.
 * @returns {Object} A style configuration object compatible with react-select's `styles` prop.
 *
 * @example
 * <Select styles={selectStyles(isSelected)} options={someOptions} />
 *
 * @see https://react-select.com/styles for more on react-select style customization
 */
export const selectStyles = (isSelected) => ({
  control: (baseStyles) => ({
    ...baseStyles,
    border: isSelected ? '1px solid green' : '1px solid transparent',
    borderRadius: 6,
    backgroundColor: isSelected ? '#00800013' : 'white',
    fontSize: 14,
    boxShadow: 'none',
    ':hover': {
      cursor: 'text',
      border: '1px solid #759ffc',
      boxShadow: '0px 0px 5px 1px #759ffc'
    },
    ':active': {
      border: '1px solid #759ffc',
      boxShadow: '0px 0px 5px 1px #759ffc'
    }
  }),
  option: (styles) => ({
    ...styles,
    ':hover': {
      cursor: 'pointer'
    }
  })
})
