import { FC } from 'react';
import { CurrentDateTime } from './components/current-date-time';

import { Container, AppBar, Toolbar as MUIToolbar } from '@mui/material';
import { GenerationMenu } from './components/generation-menu';
import { Toolbar } from '../finance-cards/components/BudgetItem/components/Expenses/components/Toolbar';
import { useTitleStore } from '../../../../stores/common/title/useTitleStore';

export const Header: FC = () => {
    const { title } = useTitleStore(state => state);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <MUIToolbar
                    disableGutters
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    {!['Main'].includes(title) && (
                        <>
                            <GenerationMenu />
                            <Toolbar />
                        </>
                    )}
                    <CurrentDateTime />
                </MUIToolbar>
            </Container>
        </AppBar>
    );
};
