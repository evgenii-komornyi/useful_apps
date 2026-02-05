import { FC } from 'react';
import { CurrentDateTime } from './components/current-date-time/'

import {
    Container,
    AppBar,
    Toolbar as MUIToolbar,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { GenerationMenu } from './components/generation-menu';
import { Toolbar } from '../FinanceApp/components/finance-cards/components/BudgetItem/components/Expenses/components/Toolbar';
import { useTitleStore } from '../../stores/common/title/useTitleStore.ts';
import { Box } from '@mui/system';
import { Criteria, mainCriteria, medicalCriteria } from '../../utils/criteria/criteria.ts';

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
                    {![...mainCriteria, ...medicalCriteria].includes(title as Criteria) && (
                        <Box
                            sx={{
                                display: 'flex',
                                width: matches ? '50%' : '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Box>
                                <GenerationMenu />
                            </Box>
                            {[Criteria.Finance, Criteria.BudgetDetails].includes(title as Criteria) && (
                                <Toolbar />
                            )}
                        </Box>
                    )}
                    {/*{![...mainCriteria, ...financeCriteria].includes(title as Criteria) && (
                        <Box
                            sx={{
                                display: 'flex',
                                width: matches ? '50%' : '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            {[...medicalCriteria].includes(title as Criteria) && (
                                <MedicalAppToolbar />
                            )}
                        </Box>
                    )}*/}
                    <CurrentDateTime />
                </MUIToolbar>
            </Container>
        </AppBar>
    );
};
