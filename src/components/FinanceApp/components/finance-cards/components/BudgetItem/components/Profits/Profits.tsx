import { Fragment, FC } from 'react';
import {
    BudgetDate,
    Expense,
    Profit,
    ProfitExpenseType,
} from '../../../../../../../../utils/common.ts';
import { ProfitItem } from './components/ProfitItem';
import { Box, Divider, IconButton, Tooltip } from '@mui/material';
import { AddCircleOutlineRounded } from '@mui/icons-material';
import { ProfitContainer } from './styles/Profits.ts';
import { useModalStore } from '../../../../../../../../stores/common/modal/useModalStore.ts';
import { TotalAmount } from '../../../TotalAmount';
import { AvailableAmount } from './components/AvailableAmount';
import { CurrentAmount } from './components/CurrentAmount/CurrentAmount.tsx';
import {
    calculateAvailableAmount,
    calculatePaidExpenses,
} from '../../../../../../../../utils/arrays/arrays.ts';

interface Props {
    profit: Profit[];
    expenses: Expense[];
    budgetDate: BudgetDate;
}

export const Profits: FC<Props> = ({ profit, expenses, budgetDate }) => {
    const { setIsOpened } = useModalStore(state => state);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
            }}
        >
            <ProfitContainer>
                {profit.length > 0 &&
                    profit.map(profitItem => (
                        <Fragment key={profitItem.id}>
                            <ProfitItem
                                profitItem={profitItem}
                                date={budgetDate}
                            />
                        </Fragment>
                    ))}
            </ProfitContainer>
            <Divider />
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: -20,
                    }}
                >
                    <Tooltip title="Additional profit" placement="right">
                        <IconButton
                            onClick={() =>
                                setIsOpened(
                                    true,
                                    ProfitExpenseType.Profit,
                                    budgetDate
                                )
                            }
                        >
                            <AddCircleOutlineRounded />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    m: 2,
                }}
            >
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ mb: 1 }}>
                        <TotalAmount array={profit} />
                    </Box>
                    <Divider />
                    <Box sx={{ mt: 1, mb: 1 }}>
                        <AvailableAmount
                            profit={profit}
                            expenses={expenses}
                            date={budgetDate}
                        />
                    </Box>
                    <Divider />
                    <Box sx={{ mt: 1 }}>
                        <CurrentAmount
                            currentAmount={
                                calculateAvailableAmount(profit, budgetDate) -
                                calculatePaidExpenses(expenses, budgetDate)
                            }
                            profit={profit}
                            expenses={expenses}
                            budgetDate={budgetDate}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
