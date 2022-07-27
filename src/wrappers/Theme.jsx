import { ThemeProvider } from 'styled-components'

const theme = {
    color: {
        green: '#14f194',
        darkGreen: '#0a794a',
        lightGreen: '#89f8ca',
        greenSecondary: '#07d18a',
        purple: '#9945ff',
        darkPurple: '#46287b',
        lightPurple: '#c4a5f8',
        pink: '#fd51fc',
        darkPink: '#802061',
        lightPink: '#fea1df',
        blue: '#85ecfe',
        darkBlue: '#046c81',
        lightBlue: '#01dbff',
        white: '#fff'
    }
}

const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

export default Theme
