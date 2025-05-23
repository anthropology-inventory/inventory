import PropTypes from 'prop-types'

function FormTextarea({ label, textareaId, textareaName, placeholderTxt, textareaValue, changeFunc }) {
  return (
    <section>
      <label>{label}</label>
      <textarea
        id={textareaId}
        name={textareaName}
        placeholder={placeholderTxt}
        value={textareaValue}
        onChange={changeFunc}
        className={!!textareaValue ? 'valid': ''}
      />
    </section>
  )
}

FormTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  textareaId: PropTypes.string,
  textareaName: PropTypes.string.isRequired,
  placeholderTxt: PropTypes.string,
  textareaValue: PropTypes.string.isRequired,
  changeFunc: PropTypes.func.isRequired
}

export default FormTextarea
