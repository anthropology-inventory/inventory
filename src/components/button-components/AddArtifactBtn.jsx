import { button } from '../../styles/CustomThemes'
import { Button, ThemeProvider } from '@mui/material'
import { Link } from 'react-router-dom'
import { BsPlusCircle } from "react-icons/bs"

/**
 * @function AddArtifactBtn
 * @description Renders a themed "Add Artifact" button that navigates to the Add Artifact form.
 * The button uses a custom theme and React Router's `Link` component for navigation.
 * It includes an icon (BsPlusCircle) and is styled for compact width.
 *
 * @returns {JSX.Element} A styled Material UI `<Button>` wrapped in a `<ThemeProvider>`.
 *
 * @example
 * <AddArtifactBtn />
 */
export default function AddArtifactBtn() {
    return (
        <ThemeProvider theme={button}>
            <Button
                variant="contained"
                color="submit"
                component={Link}
                to='/AddArtifact'
                startIcon={<BsPlusCircle/>}
                sx={{
                    minWidth: 'fit-content'
                }}
            >
            Add Artifact
            </Button>
        </ThemeProvider>
    )
}