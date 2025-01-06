import { Fragment, ReactElement } from 'react';
import { FinanceApplicationContentContainer } from '../../styles/FinanceApp.ts';
import { useBudgetStore } from '../../../../stores/finance-app/budget/useBudgetStore.ts';

import { BudgetItem } from './components/BudgetItem';
import { AdditionalItemModal } from './components/AdditionalItemModal';
import { Typography } from '@mui/material';
import { Icon } from '../../../Icon/Icon.tsx';
import { faCalendarDays, faGear } from '@fortawesome/free-solid-svg-icons';

export const FinanceCards = (): ReactElement => {
    const { budget } = useBudgetStore(state => state);

    return (
        <FinanceApplicationContentContainer container spacing={2}>
            {budget.length > 0 ? (
                budget.map((budgetItem, index) => (
                    <Fragment key={index}>
                        <BudgetItem budgetItem={budgetItem} />
                    </Fragment>
                ))
            ) : (
                <Typography variant="h3">
                    You have to configure your application. Click on{' '}
                    <Icon icon={faGear} /> icon to do it. When you finished
                    configure, then you can generate your Budget by clicking on{' '}
                    <Icon icon={faCalendarDays} />{' '}
                </Typography>
            )}
            <AdditionalItemModal />
        </FinanceApplicationContentContainer>
    );
};
