import { FC } from 'react';
import { FinanceApplicationContentContainer } from '../../styles/FinanceApp.ts';
import { useBudgetStore } from '../../../../stores/finance-app/budget/useBudgetStore.ts';

import { BudgetItem } from './components/BudgetItem';
import { AdditionalItemModal } from './components/AdditionalItemModal';
import { Typography } from '@mui/material';
import { Icon } from '../../../Icon/Icon.tsx';
import { faCalendarDays, faGear } from '@fortawesome/free-solid-svg-icons';
import { SnackbarAlert } from '../../../SnackbarAlert/SnackbarAlert.tsx';

export const FinanceCards: FC = () => {
    const { budget } = useBudgetStore(state => state);

    return (
        <FinanceApplicationContentContainer container spacing={2}>
            {budget.length > 0 ? (
                budget
                    .slice()
                    .sort((a, b) => {
                        if (a.year !== b.year) return a.year - b.year;
                        return b.month - a.month;
                    })
                    .map((budgetItem, index) => (
                        <BudgetItem
                            key={index}
                            budgetItem={budgetItem}
                            idx={index}
                        />
                    ))
            ) : (
                <Typography variant="h5">
                    You have to configure your application. Click on{' '}
                    <Icon icon={faGear} /> icon to do it. When you finished
                    configure, then you can generate your Budget by clicking on{' '}
                    <Icon icon={faCalendarDays} />{' '}
                </Typography>
            )}
            <AdditionalItemModal />
            <SnackbarAlert
                variant="outlined"
                severity="error"
                message="You changed the payment from the past. Please change 'Current' value as well!"
                hasAction
                type="changesDetection"
            />
        </FinanceApplicationContentContainer>
    );
};
