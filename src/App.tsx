import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MainRoutes } from './routes/Route.tsx';
import { GlobalStyle, Main, Wrapper } from './styles/Global.ts';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { FC } from 'react';
import { Header } from './components/FinanceApp/components/header/Header.tsx';
import { Footer } from './components/FinanceApp/components/footer/Footer.tsx';

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
                <Header />
                <Wrapper>
                    <MainRoutes />
                    <Main>
                        <Outlet />
                    </Main>
                </Wrapper>
                <Footer />
            </ThemeProvider>
        </LocalizationProvider>
    );
};

export default App;
