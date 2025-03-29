import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MainRoutes } from './routes/Route.tsx';
import { GlobalStyle, Main, Wrapper } from './styles/Global.ts';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { FC } from 'react';

const darkTheme = createTheme({
    palette: {
        background: {
            default: '#000000',
        },
        // primary: {
        //     main: '#000000',
        // },
        mode: 'dark',
    },
});

export const App: FC = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <ThemeProvider theme={darkTheme}>
                <GlobalStyle />
                <CssBaseline />
                <Wrapper>
                    <MainRoutes />
                    <Main>
                        <Outlet />
                    </Main>
                    {/*<Footer />*/}
                </Wrapper>
            </ThemeProvider>
        </LocalizationProvider>
    );
};

export default App;
