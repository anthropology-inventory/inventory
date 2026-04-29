import { useState } from 'react'
import { Box, Button, CircularProgress, ThemeProvider } from '@mui/material'
import { Bounce, toast } from 'react-toastify'
import FormFieldset from '../../components/form-components/FormFieldset'
import FormInput from '../../components/form-components/FormInput'
import FormSelect from '../../components/form-components/FormSelect'
import BackButton from '../../components/button-components/BackBtn'
import { button } from '../../styles/CustomThemes'
import { validateInput } from '../../utils/signIn_validation'
import { signup } from '../../utils/api'

export default function CreateUserForm({ onUserCreated }) {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [backendErrors, setBackendErrors] = useState({
    email: '',
    password: ''
  })

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [serverMessage, setServerMessage] = useState('')

  const userTypeOptions = [
    { value: false, label: 'Standard User' },
    { value: true, label: 'Admin User' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target

    let validation = {}
    if (name === 'email' || name === 'password') {
      validation = validateInput(name, value)
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
    setTouched((prev) => ({ ...prev, [name]: true }))

    setErrors((prev) => ({
      ...prev,
      [name]:
        name === 'confirmPassword'
          ? value !== formData.password
            ? 'Passwords do not match.'
            : ''
          : validation[name] || ''
    }))

    setBackendErrors((prev) => ({ ...prev, [name]: '' }))
    setServerMessage('')
    setSuccessMessage('')
  }

  const handleSelectChange = (selectedOption, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setServerMessage('')
    setSuccessMessage('')

    const emailValidation = validateInput('email', formData.email)
    const passwordValidation = validateInput('password', formData.password)

    const nextErrors = {
      email: emailValidation.email || '',
      password: passwordValidation.password || '',
      confirmPassword:
        formData.confirmPassword !== formData.password ? 'Passwords do not match.' : ''
    }

    setTouched({
      email: true,
      password: true,
      confirmPassword: true
    })

    setErrors(nextErrors)

    if (nextErrors.email || nextErrors.password || nextErrors.confirmPassword) {
      setLoading(false)
      return
    }

    const result = await signup(formData.email, formData.password, formData.isAdmin)

    if (result.ok) {
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        isAdmin: false
      })

      setErrors({
        email: '',
        password: '',
        confirmPassword: ''
      })

      setBackendErrors({
        email: '',
        password: ''
      })

      setTouched({
        email: false,
        password: false,
        confirmPassword: false
      })

      setSuccessMessage('User created successfully.')

      if (onUserCreated) {
        onUserCreated()
      }

      toast.success('User created successfully.', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        theme: 'colored',
        transition: Bounce
      })
    } else {
      const apiErrors = result.data?.errors || {}

      const fieldErrors = {
        email: apiErrors.email || '',
        password: apiErrors.password || ''
      }

      const hasFieldErrors = fieldErrors.email || fieldErrors.password
      const fallbackMessage = result.data?.message || 'Failed to create user.'

      setBackendErrors(fieldErrors)
      setServerMessage(hasFieldErrors ? '' : fallbackMessage)

      toast.error(hasFieldErrors ? 'Please fix the highlighted fields.' : fallbackMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        theme: 'colored',
        transition: Bounce
      })
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} id="create-user-form" autoComplete="on">
      {/* <Box id="back-btn">
        <BackButton />
      </Box> */}

      <FormFieldset
        fieldsetID="create-user-fields"
        title="Create User"
        fields={[
          <FormInput
            key="email"
            label="Email"
            inputType="email"
            inputName="email"
            placeholderTxt="Enter new user's email..."
            isRequired={true}
            inputValue={formData.email}
            changeFunc={handleChange}
            inputClass={touched.email && (errors.email || backendErrors.email) ? 'invalid' : ''}
            validationErr={backendErrors.email || errors.email}
            hasTooltip={true}
            tooltipTxt={'This user will sign in using this email.'}
          />,

          <FormInput
            key="password"
            label="Password"
            inputType="password"
            inputName="password"
            placeholderTxt="Enter a password..."
            isRequired={true}
            inputValue={formData.password}
            changeFunc={handleChange}
            inputClass={
              touched.password && (errors.password || backendErrors.password) ? 'invalid' : ''
            }
            validationErr={backendErrors.password || errors.password}
            hasTooltip={true}
            tooltipTxt={'Use at least 8 characters with letters, numbers, or symbols.'}
          />,

          <FormInput
            key="confirmPassword"
            label="Confirm Password"
            inputType="password"
            inputName="confirmPassword"
            placeholderTxt="Re-enter password..."
            isRequired={true}
            inputValue={formData.confirmPassword}
            changeFunc={handleChange}
            inputClass={touched.confirmPassword && errors.confirmPassword ? 'invalid' : ''}
            validationErr={errors.confirmPassword}
            hasTooltip={true}
            tooltipTxt={'Both password fields must match.'}
          />,

          <FormSelect
            key="userType"
            label="User Type"
            selectName="isAdmin"
            isRequired={true}
            selectValue={formData.isAdmin}
            changeFunc={handleSelectChange}
            selectOptions={userTypeOptions}
            hasTooltip={true}
            tooltipTxt="Choose whether this user has admin permissions."
          />,

          <ThemeProvider key="submit" theme={button}>
            <Button
              id="submit-btn"
              variant="contained"
              type="submit"
              color={loading ? 'loading' : 'submit'}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              disabled={loading}
            >
              {loading ? 'Creating user...' : 'Create User'}
            </Button>
          </ThemeProvider>,

          serverMessage ? (
            <small key="server-msg" className="validation-err">
              {serverMessage}
            </small>
          ) : null,

          successMessage ? (
            <small key="success-msg" className="hint">
              {successMessage}
            </small>
          ) : null
        ]}
      />
    </form>
  )
}