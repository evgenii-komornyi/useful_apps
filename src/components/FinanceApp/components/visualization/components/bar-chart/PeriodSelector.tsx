import { FC } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Grid,
} from '@mui/material';

interface Props {
    startMonth: number;
    startYear: number;
    endMonth: number;
    endYear: number;
    onStartMonthChange: (value: number) => void;
    onStartYearChange: (value: number) => void;
    onEndMonthChange: (value: number) => void;
    onEndYearChange: (value: number) => void;
}

export const PeriodRangeSelector: FC<Props> = ({
    startMonth,
    startYear,
    endMonth,
    endYear,
    onStartMonthChange,
    onStartYearChange,
    onEndMonthChange,
    onEndYearChange,
}) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i);

    return (
        <Box component="fieldset" sx={{ border: 'none', p: 0, m: 0, mb: 2 }}>
            <legend style={{ fontWeight: 'bold', marginBottom: 8 }}>
                Select Period Range
            </legend>

            <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="start-month-label">
                            Start Month
                        </InputLabel>
                        <Select
                            labelId="start-month-label"
                            id="start-month"
                            value={startMonth}
                            label="Start Month"
                            onChange={e => onStartMonthChange(+e.target.value)}
                            aria-describedby="start-month-helptext"
                        >
                            {months.map(m => (
                                <MenuItem key={m} value={m}>
                                    {new Date(0, m).toLocaleString('default', {
                                        month: 'long',
                                    })}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="start-year-label">
                            Start Year
                        </InputLabel>
                        <Select
                            labelId="start-year-label"
                            id="start-year"
                            value={startYear}
                            label="Start Year"
                            onChange={e => onStartYearChange(+e.target.value)}
                            aria-describedby="start-year-helptext"
                        >
                            {years.map(y => (
                                <MenuItem key={y} value={y}>
                                    {y}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="end-month-label">End Month</InputLabel>
                        <Select
                            labelId="end-month-label"
                            id="end-month"
                            value={endMonth}
                            label="End Month"
                            onChange={e => onEndMonthChange(+e.target.value)}
                            aria-describedby="end-month-helptext"
                        >
                            {months.map(m => (
                                <MenuItem key={m} value={m}>
                                    {new Date(0, m).toLocaleString('default', {
                                        month: 'long',
                                    })}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="end-year-label">End Year</InputLabel>
                        <Select
                            labelId="end-year-label"
                            id="end-year"
                            value={endYear}
                            label="End Year"
                            onChange={e => onEndYearChange(+e.target.value)}
                            aria-describedby="end-year-helptext"
                        >
                            {years.map(y => (
                                <MenuItem key={y} value={y}>
                                    {y}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};
