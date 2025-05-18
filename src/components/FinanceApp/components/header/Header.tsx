import { FC } from 'react';
import { CurrentDateTime } from './components/current-date-time';

import {
    Container,
    AppBar,
    Toolbar as MUIToolbar,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { GenerationMenu } from './components/generation-menu';
import { Toolbar } from '../finance-cards/components/BudgetItem/components/Expenses/components/Toolbar';
import { useTitleStore } from '../../../../stores/common/title/useTitleStore';
import { Box } from '@mui/system';

export const Header: FC = () => {
    const { title } = useTitleStore(state => state);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <MUIToolbar
                    disableGutters
                    sx={{
                        display: 'flex',
                        flexDirection: matches ? 'row' : 'column-reverse',
                        justifyContent: 'space-between',
                        pt: matches ? 0 : 2,
                    }}
                >
                    {!['Main'].includes(title) && (
                        <Box
                            sx={{
                                display: 'flex',
                                width: matches ? '50%' : '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <GenerationMenu />
                            {['Finance', 'BudgetDetails'].includes(title) && (
                                <Toolbar />
                            )}
                        </Box>
                    )}
                    <CurrentDateTime />
                </MUIToolbar>
            </Container>
        </AppBar>
    );
};
