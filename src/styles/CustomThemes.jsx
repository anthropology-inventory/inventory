import { createTheme } from '@mui/material/styles';

export const button = createTheme({
    palette: {
        // Primary action — teal (kept & refined)
        submit: {
            main: '#008080',
            dark: '#006666',
            contrastText: 'white'
        },
        // View / detail action — warm mid-brown
        view: {
            main: '#5c3d1e',
            dark: '#3e2710',
            contrastText: 'white'
        },
        // Loading state — muted clay tone
        loading: {
            main: '#c4875a'
        },
        // Destructive action — kept as strong red for clarity
        delete: {
            main: '#c0392b',
            dark: '#962d22',
            contrastText: 'white'
        },
        // Edit action — teal variant (keeps it in the palette family)
        edit: {
            main: '#008080',
            dark: '#006666',
            contrastText: 'white'
        },
        // Back / secondary — dark brown
        back: {
            main: '#2e1a0e',
            dark: '#1e0f06',
            contrastText: '#f2e8d5'
        }
    }
});