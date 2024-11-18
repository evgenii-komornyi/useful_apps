import {Fragment, ReactElement} from "react";
import {BudgetDate, Profit, ProfitExpenseType} from "../../../../../../../../utils/common.ts";
import {ProfitItem} from "./components/ProfitItem";
import {Box, IconButton, Tooltip} from "@mui/material";
import {AddCircleOutlineRounded} from "@mui/icons-material";
import {ProfitContainer} from "./styles/Profits.ts";
import {useModalStore} from "../../../../../../../../stores/common/modal/useModalStore.ts";
import {TotalAmount} from "./components/TotalAmount";
import {AvailableAmount} from "./components/AvailableAmount";

interface Props {
    profit: Profit[];
    budgetDate: BudgetDate;
}

export const Profits = ({profit, budgetDate}: Props): ReactElement => {
    const {setIsOpened} = useModalStore(state => state);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
            <ProfitContainer>
                {
                    profit.length > 0 && (profit.map(profitItem => (
                        <Fragment key={profitItem.id}>
                            <ProfitItem profitItem={profitItem} date={budgetDate} />
                        </Fragment>
                    )))
                }
            </ProfitContainer>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', m: 2 }}>
                <TotalAmount profit={profit} />
                <AvailableAmount profit={profit} date={budgetDate} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Tooltip title="Additional profit" placement="right">
                    <IconButton onClick={() => setIsOpened(true, ProfitExpenseType.Profit, budgetDate)}>
                        <AddCircleOutlineRounded />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}