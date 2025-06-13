import { button } from '../../styles/CustomThemes'
import { Button, ThemeProvider } from '@mui/material'
import { Link } from 'react-router-dom'
import { BsEye } from "react-icons/bs"

/**
 * @function ViewCollectionBtn
 * @description Renders a themed "View Collection" button that navigates the user
 * to the Specimens Explorer page (`/SpecimensExplorer`) using React Router's `Link` component.
 * The button includes an eye icon and custom styling for compact width.
 *
 * @returns {JSX.Element} A styled Material UI `<Button>` wrapped in a `<ThemeProvider>`.
 *
 * @example
 * <ViewCollectionBtn />
 */
export default function ViewCollectionBtn() {
    return (
        <ThemeProvider theme={button}>
            <Button
                variant="contained"
                color="view"
                component={Link}
                to='/SpecimensExplorer'
                startIcon={<BsEye/>}
                sx={{
                    minWidth: 'fit-content'
                }}
            >
            View Collection
            </Button>
        </ThemeProvider>
    )
}