import { ReactElement, useEffect, useState } from 'react';
import { Divider, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useAnchor } from '../../../../../../hooks/common/useAnchor.ts';
import { useBudgetStore } from '../../../../../../stores/finance-app/budget/useBudgetStore.ts';
import { Budget, ProfitExpenseType } from '../../../../../../utils/common.ts';
import { SnackbarAlert } from '../../../../../SnackbarAlert';
import { useSnackbarStore } from '../../../../../../stores/common/snackbar/useSnackbarStore.ts';
import { useFinanceSettingsStore } from '../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { CalendarMonthOutlined } from '@mui/icons-material';

const GENERATION_OPTIONS: number[] = [1, 3, 6, 12];

export const GenerationMenu = (): ReactElement => {
    const { anchorEl, open, handleClick, handleClose } = useAnchor();
    const { budget, setBudget, setUpdatedSettings } = useBudgetStore();
    const { user } = useFinanceSettingsStore(state => state);
    const { setIsOpened } = useSnackbarStore();

    const [hasOpenedAlert, setHasOpenedAlert] = useState(false);
    const [generatedBudget, setGeneratedBudget] = useState<Budget[]>([]);
    const [savedMonthsCountToGenerate, setSavedMonthsCountToGenerate] =
        useState<number>(0);

    const getDaysInMonth = (year: number, month: number): number =>
        new Date(year, month + 1, 0).getDate();

    const generateBudget = (
        monthsCountToGenerate: number,
        skipCurrentMonth: boolean = false,
        callback?: (newBudget: Budget[]) => void
    ) => {
        const now = new Date();
        const lastElement: number = budget.length - 1;
        const currentMonth: number = now.getMonth();
        const startMonth = skipCurrentMonth
            ? budget[lastElement].month + 1
            : currentMonth;
        const startYear = skipCurrentMonth
            ? budget[lastElement].year
            : now.getFullYear();

        const budgetArray: Budget[] = Array.from(
            { length: monthsCountToGenerate },
            (_, i) => {
                const month = (startMonth + i) % 12;
                const year = startYear + Math.floor((startMonth + i) / 12);

                return {
                    month,
                    year,
                    daysInMonth: getDaysInMonth(year, month),
                    moneyPerDay:
                        user && user.moneyPerDay ? user.moneyPerDay : 0,
                    profit: user && user.profit ? user.profit : [],
                    expenses: user && user.expenses ? user.expenses : [],
                };
            }
        );

        setGeneratedBudget(budgetArray);

        if (callback) callback(budgetArray);
    };

    const setNewBudgetOrOpenChoiceWindow = () => {
        if (generatedBudget.length === 0) return;

        if (budget.length === 0) {
            setBudget(generatedBudget);
        } else {
            setIsOpened(true, 'budget');
        }
    };

    useEffect(() => {
        if (generatedBudget.length > 0 && !hasOpenedAlert) {
            setNewBudgetOrOpenChoiceWindow();
            setHasOpenedAlert(true);
        }
    }, [generatedBudget, hasOpenedAlert]);

    const generateBudgetHandler = (monthsCountToGenerate: number) => {
        setSavedMonthsCountToGenerate(monthsCountToGenerate);
        generateBudget(monthsCountToGenerate);
        setHasOpenedAlert(false);
    };

    const choiceClickHandler = (e?: MouseEvent) => {
        const target = e?.target as HTMLButtonElement;
        const id = target?.id;

        if (id) {
            if (id === 'addToExisting') {
                generateBudget(savedMonthsCountToGenerate, true, newBudget => {
                    setBudget([...budget, ...newBudget]);
                });
            }

            if (id === 'replace') {
                setBudget(generatedBudget);
            }

            setIsOpened(false, 'budget');
            generatedBudget.forEach(item => {
                setUpdatedSettings(item.profit, ProfitExpenseType.Profit);
                setUpdatedSettings(item.expenses, ProfitExpenseType.Expenses);
            });
        }
    };

    return (
        <>
            <Tooltip title="Generate Budget">
                <IconButton
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <CalendarMonthOutlined />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {GENERATION_OPTIONS.map((option, index) => (
                    <div key={index}>
                        <MenuItem onClick={() => generateBudgetHandler(option)}>
                            {`${
                                option === 12
                                    ? `1 year`
                                    : `${option} month${
                                          option !== 1 ? 's' : ''
                                      }`
                            }`}
                        </MenuItem>
                        {index !== GENERATION_OPTIONS.length - 1 && <Divider />}
                    </div>
                ))}
            </Menu>
            <SnackbarAlert
                severity="warning"
                message="Make your choice!"
                onClick={choiceClickHandler}
                hasAction
                hasReplace
                hasAddToExisting
                type="budget"
            />
        </>
    );
};
