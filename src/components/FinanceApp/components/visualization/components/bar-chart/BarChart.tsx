import { FC, useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useFinanceSettingsStore } from '../../../../../../stores/finance-app/settings/useSettingsStore';
import { useExpenseData } from './useExpenseData';
import { PeriodRangeSelector } from './PeriodSelector';
import { ExpenseSelector } from './ExpenseSelector';
import { ExpandMore } from '@mui/icons-material';

export const BarsChart: FC = () => {
    const { user } = useFinanceSettingsStore(state => state);

    const now = new Date();
    const [startMonth, setStartMonth] = useState(0);
    const [startYear, setStartYear] = useState(now.getFullYear());
    const [endMonth, setEndMonth] = useState(now.getMonth());
    const [endYear, setEndYear] = useState(now.getFullYear());

    const { dataSet, allExpenseKeys, valueFormatter } = useExpenseData(
        startMonth,
        startYear,
        endMonth,
        endYear,
        user.currency,
        user.locale
    );
    const [selectedKeys, setSelectedKeys] = useState(allExpenseKeys);

    const handleToggle = (key: string) => {
        setSelectedKeys(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    const series = selectedKeys.map(key => ({
        dataKey: key,
        label: key.replace(/_/g, ' ').replace(/^./, str => str.toUpperCase()),
        valueFormatter,
    }));

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box>
            {matches ? (
                <>
                    <PeriodRangeSelector
                        startMonth={startMonth}
                        startYear={startYear}
                        endMonth={endMonth}
                        endYear={endYear}
                        onStartMonthChange={setStartMonth}
                        onStartYearChange={setStartYear}
                        onEndMonthChange={setEndMonth}
                        onEndYearChange={setEndYear}
                    />

                    <ExpenseSelector
                        allKeys={allExpenseKeys}
                        selectedKeys={selectedKeys}
                        onToggle={handleToggle}
                    />
                </>
            ) : (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">Filter</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PeriodRangeSelector
                            startMonth={startMonth}
                            startYear={startYear}
                            endMonth={endMonth}
                            endYear={endYear}
                            onStartMonthChange={setStartMonth}
                            onStartYearChange={setStartYear}
                            onEndMonthChange={setEndMonth}
                            onEndYearChange={setEndYear}
                        />

                        <ExpenseSelector
                            allKeys={allExpenseKeys}
                            selectedKeys={selectedKeys}
                            onToggle={handleToggle}
                        />
                    </AccordionDetails>
                </Accordion>
            )}

            <BarChart
                dataset={dataSet}
                xAxis={[{ dataKey: 'month' }]}
                series={series}
                yAxis={[{ label: `Expenses (${user.currency})`, width: 60 }]}
                height={300}
            />
        </Box>
    );
};
