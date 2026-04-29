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
export const selectStyles = () => ({
  control: (baseStyles, state) => ({
    ...baseStyles,

    backgroundColor: 'var(--cream)',
    border: state.isFocused
      ? '1px solid var(--teal)'
      : '1px solid var(--border-warm)',

    boxShadow: 'none',

    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer'
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

  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    cursor: 'pointer'
  }),

  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    display: 'none'
  }),

  container: (baseStyles) => ({
    ...baseStyles,
    boxShadow: 'none'
  }),

  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: 'var(--text-dark)',
    fontFamily: "'DM Sans', sans-serif",
  }),

  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: '#857d74',
    fontFamily: "'DM Sans', sans-serif",
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: 'var(--text-dark)',
    fontFamily: "'DM Sans', sans-serif",
  }),
});