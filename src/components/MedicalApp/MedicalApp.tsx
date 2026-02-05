import { FC, useEffect, useState } from 'react';
import { Grid2 as Grid } from '@mui/material';
import { MedicalApplicationContentContainer } from './styles/MedicalApp.tsx';
import { Calendar } from './components/Calendar';
import dayjs, { Dayjs } from 'dayjs';
import { IAnamnesis } from '../../utils/common.ts';
import { useAnamnesisStore } from '../../stores/medical-app/anamnesis/useAnamnesisStore.ts';
import { AnamnesisItem } from './components/AnamnesisItem/AnamnesisItem.tsx';

export const MedicalApp: FC = () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(
        undefined,
    );
    const { anamnesis } = useAnamnesisStore(state => state);
    const [selectedAnamnesis, setSelectedAnamneses] = useState<
        IAnamnesis | undefined
    >(undefined);

    useEffect(() => {
        if (selectedDate) {
            setSelectedAnamneses(
                anamnesis.find(
                    a =>
                        a.month === selectedDate?.month() &&
                        a.year === selectedDate?.year(),
                )!,
            );
        } else {
            setSelectedAnamneses(
                anamnesis.find(
                    a =>
                        a.month === dayjs().month() &&
                        a.year === dayjs().year(),
                )!,
            );
        }
    }, [selectedDate, anamnesis]);

    const handleDateChange = (newValue: Dayjs) => {
        setExpanded(true);
        setSelectedDate(dayjs(newValue));
    };

    const handleClose = () => {
        setExpanded(false);
        setSelectedDate(undefined);
    };

    return (
        <MedicalApplicationContentContainer container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <MedicalApplicationContentContainer
                    container
                    spacing={2}
                    justifyContent="flex-start"
                >
                    <Calendar
                        expanded={expanded}
                        selectedDate={selectedDate}
                        onChange={handleDateChange}
                        onMonthChange={setSelectedAnamneses}
                        onClose={handleClose}
                    />
                    <AnamnesisItem
                        selectedAnamnesis={selectedAnamnesis}
                        selectedDate={selectedDate}
                    />
                </MedicalApplicationContentContainer>
            </Grid>
        </MedicalApplicationContentContainer>
    );
};
