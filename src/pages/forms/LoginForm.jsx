import FormFieldset from '../../components/form-components/FormFieldset'
import FormInput from '../../components/form-components/FormInput'
import { useState } from 'react'
import { validateInput } from '../../utils/signIn_validation'
import { login } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { toast, Bounce } from 'react-toastify'
import { Button, CircularProgress, ThemeProvider } from '@mui/material'
import { button } from '../../styles/CustomThemes'

export default function LoginForm() {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setTouched({ ...touched, [name]: value })

    const input = validateInput(name, value)
    setErrors({ ...errors, [name]: input[name] || '' })
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const hasValidationErrors = Object.values(errors).some(Boolean)
    if (hasValidationErrors) {
      console.log('Form has validation errors')
      console.log(errors)
      return // prevent form submission if errors exist
    }

    try {
      const res = await login(formData.email, formData.password)
      const data = await res.json()

      // // prevent login if fails
      if (!res.ok) {
        console.log(data.errors || data.error)
        toast.error(`Login failed...`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        theme: 'colored',
        transition: Bounce
      })
        setLoading(false)
        return
      }

      // Set token
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      toast.success(`Welcome!`, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        progress: undefined,
        theme: 'colored',
        transition: Bounce
      })
      setTimeout(() => {
        navigate('/Dashboard')
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} id="login-form" autoComplete="on">
      <FormFieldset
        fieldsetID="login-fields"
        title="User Login"
        fields={[
          <FormInput
            key="email"
            label="Email"
            inputType="text"
            inputName="email"
            placeholderTxt="Please enter your email..."
            isRequired={true}
            changeFunc={handleChange}
            inputClass={formData.email === '' ? '' : errors.email ? 'invalid' : 'valid'}
            validationErr={errors.email}
            hasTooltip={true}
            tooltipTxt={'Your GRC staff email.'}
          ></FormInput>,
          <FormInput
            key="password"
            label="Password"
            inputType="password"
            inputName="password"
            placeholderTxt="Please enter your password..."
            isRequired={true}
            changeFunc={handleChange}
            inputClass={formData.password === '' ? '' : errors.password ? 'invalid' : 'valid'}
            validationErr={errors.password}
          ></FormInput>,
          <ThemeProvider theme={button}>
            <Button 
              key="submit" 
              id="login-btn"
              variant='contained'
              type="submit"
              color={loading ? 'loading' : 'submit'} 
              startIcon={loading && <CircularProgress size={20} />}
              >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </ThemeProvider>
        ]}
      />
    </form>
  )
}
