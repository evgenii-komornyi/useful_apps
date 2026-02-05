import { FC, useEffect, useState } from 'react';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Badge, BadgeProps, Card, CardActions, CardContent, CardHeader, Collapse, IconButton } from '@mui/material';
import { useAnamnesisStore } from '../../../../stores/medical-app/anamnesis/useAnamnesisStore.ts';
import { AddSymptoms } from '../AnamnesisItem/components/AddSymptoms';
import { formatDateByLocale } from '../../../../utils/formatters/dates.ts';
import { useFinanceSettingsStore } from '../../../../stores/finance-app/settings/useSettingsStore.ts';
import {
    CalendarMonthOutlined,
    CloseOutlined,
    SentimentVeryDissatisfied
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { IAnamnesis } from '../../../../utils/common.ts';

interface Props {
    expanded: boolean;
    selectedDate: Dayjs | undefined;
    onChange: (newValue: Dayjs) => void;
    onMonthChange: (selectedAnamnesis: IAnamnesis | undefined) => void;
    onClose: () => void;
}

interface HState {
    day: number;
    month: number;
    year: number;
}

const StyledBadge = styled(Badge)<BadgeProps>({
    '& .MuiBadge-badge': {
        right: 8,
        top: 6,
        padding: '0',
    },
});

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: HState[] }) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected =
        !props.outsideCurrentMonth && highlightedDays.findIndex(item => item.day === props.day.date() && item.month === props.day.month() && item.year === props.day.year()) >= 0;

    return (
        <StyledBadge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? <SentimentVeryDissatisfied fontSize="small" /> : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </StyledBadge>
    );
}


export const Calendar: FC<Props> = ({ expanded, selectedDate, onChange, onMonthChange, onClose }) => {
    const { anamnesis } = useAnamnesisStore(state => state);
    const { user } = useFinanceSettingsStore(state => state);
    const [highlightedDays, setHighlightedDays] = useState<HState[]>([]);

    const fetchHighlightedDays = (date: Dayjs) => {
        const anamnesisItem = anamnesis.find(anamnesisItem => anamnesisItem.year === date.year() && anamnesisItem.month === date.month());
        setHighlightedDays(anamnesisItem?.symptoms.map(({ date: { day, month, year } }) => ({day, month, year})) || []);
    };

    useEffect(() => {
        fetchHighlightedDays(dayjs());
    }, []);

    const onMonthChangeHandler = (newDate: Dayjs) => {
        fetchHighlightedDays(newDate);
        onMonthChange(anamnesis.find(anamnesisItem => anamnesisItem.year === newDate.year() && anamnesisItem.month === newDate.month()));
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Card>
                <CardContent>
                    <DateCalendar
                        disableFuture
                        onChange={onChange}
                        onMonthChange={onMonthChangeHandler}
                        autoFocus={true}
                        value={selectedDate}
                        slots={{
                            day: ServerDay,
                        }}
                        slotProps={{
                            day: {
                                highlightedDays,
                            } as any,
                        }}
                    />
                </CardContent>
                <CardActions disableSpacing>
                    <Card variant="outlined" sx={{ width: '100%' }}>
                        <CardHeader
                            avatar={
                                <CalendarMonthOutlined />
                            }
                            title="Select date"
                            subheader={selectedDate ? `the symptom will be added for ${formatDateByLocale(
                                user.locale,
                                new Date(selectedDate?.year(), selectedDate?.month(), selectedDate?.date()),
                                false,
                                true,
                                true,
                            )}`: ''}
                            action={
                            expanded &&
                                <IconButton onClick={onClose} aria-label="close" aria-expanded={expanded}>
                                    <CloseOutlined />
                                </IconButton>
                            }
                        />
                    </Card>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <AddSymptoms
                        date={selectedDate}
                        symptoms={anamnesis
                            .find(anamnesisItem => anamnesisItem.year === selectedDate?.year()
                                && anamnesisItem.month === selectedDate?.month()
                            )?.symptoms
                        }
                    />
                </Collapse>
            </Card>
        </LocalizationProvider>
    );
}