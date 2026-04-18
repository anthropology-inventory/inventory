import { button } from '../../styles/CustomThemes'
import { Button, ThemeProvider } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { BsArrowLeftCircle } from "react-icons/bs"

/**
 * @function BackButton
 * @description Renders a themed "Go Back" button that navigates the user to the previous page
 * in the browser history using React Router's `useNavigate` hook.
 * The button includes an arrow-left icon and uses a custom theme.
 *
 * @returns {JSX.Element} A styled Material UI `<Button>` wrapped in a `<ThemeProvider>`.
 *
 * @example
 * <BackButton />
 */
export default function BackButton() {
    const navigate = useNavigate()
    const handleGoBack = () => {
        navigate(-1)
        setTimeout(() => window.location.reload(), 300)
    }
    return (
        <ThemeProvider theme={button}>
            <Button
                variant="contained"
                color="back"
                // component={Link}
                onClick={handleGoBack}
                startIcon={<BsArrowLeftCircle />}
                sx={{
                    borderRadius: '4px',
                    textTransform: 'none',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '0.02em'
                }}
            >
                Go Back
            </Button>
        </ThemeProvider>
    )
}