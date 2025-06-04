import {
  createTheme,
  alpha,
  getContrastRatio,
} from '@mui/material/styles';

export const button = createTheme({
    palette: {
        submit: {
            main: '#1aac83',
            dark: '#179974'
        },
        loading: {
            main: '#4371d6'
        },
        delete: {
            main: '#c70000',
            dark: '#970101',
            contrastText: 'white'
        },
        edit: {
            main: '#1976d2',
            dark: '#1a5ea1',
            contrastText: 'white'
        },
        back: {
            main: '#2c2c2c',
            dark: '#1b1b1b',
            contrastText: 'white'
        }
        
    }
})