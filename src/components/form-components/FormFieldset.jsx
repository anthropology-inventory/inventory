import PropTypes from 'prop-types'
import { useState } from 'react'
import '../../styles/form-styles.css'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { BsArrowDownSquareFill, BsArrowUpSquareFill } from 'react-icons/bs'

function FormFieldset({ fieldsetID, title, fields, isOptional }) {
  const [fieldVisibility, setFieldVisibility] = useState('')
  return (
    <fieldset id={fieldsetID} className={isOptional ? 'optional-section' : null}>
      <h3>
        {title}
        {isOptional ? (
          <Tooltip title="View fields" placement="right-end" arrow>
            <IconButton
              id="dropdown-btn"
              onClick={() =>
                fieldVisibility == '' ? setFieldVisibility('visible') : setFieldVisibility('')
              }
            >
              {fieldVisibility == '' ? <BsArrowDownSquareFill /> : <BsArrowUpSquareFill />}
            </IconButton>
          </Tooltip>
        ) : null}
      </h3>
      <div className={`fieldset-fields ${fieldVisibility}`}>{fields}</div>
    </fieldset>
  )
}

FormFieldset.propTypes = {
  fieldsetID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.node),
  isOptional: PropTypes.bool
}

export default FormFieldset
