import { Fragment, FC } from 'react';
import {
    BudgetDate,
    Direction,
    Expense,
    Justify,
    Position,
    Profit,
    ProfitExpenseType,
} from '../../../../../../../../utils/common.ts';
import { ProfitItem } from './components/ProfitItem';
import { Box as MUIBox, Divider, IconButton, Tooltip } from '@mui/material';
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
import { Box, PositionedBox } from '../../../../../../../../styles/Global.ts';

interface Props {
    profit: Profit[];
    expenses: Expense[];
    budgetDate: BudgetDate;
}

export const Profits: FC<Props> = ({ profit, expenses, budgetDate }) => {
    const { setIsOpened } = useModalStore(state => state);

    return (
        <Box $direction={Direction.Column} $justifyContent={Justify.Start}>
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
            <PositionedBox $position={Position.Relative} sx={{ mb: 1 }}>
                <PositionedBox
                    $position={Position.Absolute}
                    sx={{
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
                </PositionedBox>
            </PositionedBox>
            <Box
                $direction={Direction.Column}
                $justifyContent={Justify.Center}
                sx={{
                    m: 2,
                }}
            >
                <MUIBox sx={{ mb: 2 }}>
                    <MUIBox sx={{ mb: 1 }}>
                        <TotalAmount array={profit} />
                    </MUIBox>
                    <Divider />
                    <MUIBox sx={{ mt: 1, mb: 1 }}>
                        <AvailableAmount
                            profit={profit}
                            expenses={expenses}
                            date={budgetDate}
                        />
                    </MUIBox>
                    <Divider />
                    <MUIBox sx={{ mt: 1 }}>
                        <CurrentAmount
                            currentAmount={
                                calculateAvailableAmount(profit, budgetDate) -
                                calculatePaidExpenses(expenses, budgetDate)
                            }
                            profit={profit}
                            expenses={expenses}
                            budgetDate={budgetDate}
                        />
                    </MUIBox>
                </MUIBox>
            </Box>
        </Box>
    );
};
