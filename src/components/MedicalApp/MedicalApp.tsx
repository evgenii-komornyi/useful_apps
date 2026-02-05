import { FC, useEffect, useState } from 'react';
import {
    Avatar,
    Card, CardContent, CardHeader,
    Grid2 as Grid
} from '@mui/material';
import { MedicalApplicationContentContainer } from './styles/MedicalApp.tsx';
import { Calendar } from './components/Calendar';
import { SummarizeOutlined } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import { IAnamnesis } from '../../utils/common.ts';
import { useAnamnesisStore } from '../../stores/medical-app/anamnesis/useAnamnesisStore.ts';

export const MedicalApp: FC = () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(undefined);
    const { anamnesis } = useAnamnesisStore(state => state);
    const [selectedAnamnesis, setSelectedAnamneses] = useState<IAnamnesis | undefined>(undefined);

    useEffect(() => {
        if (selectedDate) {
            setSelectedAnamneses(anamnesis.find(a => a.month === selectedDate?.month() && a.year === selectedDate?.year())!);
        } else {
            setSelectedAnamneses(anamnesis.find(a => a.month === dayjs().month() && a.year === dayjs().year())!);
        }

    }, [selectedDate, anamnesis]);

    const handleDateChange = (newValue: Dayjs) => {
        setExpanded(true);
        setSelectedDate(dayjs(newValue));
    }

    const handleClose = () => {
        setExpanded(false);
        setSelectedDate(undefined);
    }
    console.log(selectedAnamnesis);
    return (
        <MedicalApplicationContentContainer container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <MedicalApplicationContentContainer container spacing={2} justifyContent="flex-start">
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                        <Calendar
                            expanded={expanded}
                            selectedDate={selectedDate}
                            onChange={handleDateChange}
                            onMonthChange={setSelectedAnamneses}
                            onClose={handleClose}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 8 }}>
                        {selectedDate ? (
                            <Card>
                                <CardHeader
                                    title={`Anamnesis`}
                                    subheader={`${selectedDate.format('MMMM D, YYYY')}`}
                                />
                            </Card>
                        ) : (
                            <Card>
                                <CardHeader
                                    title={`Anamnesis`}
                                    {...(selectedAnamnesis && { subheader: `${dayjs(`${selectedAnamnesis?.year}-${selectedAnamnesis?.month + 1}`).format('MMMM YYYY')}` })}
                                />
                                <CardContent>
                                    <Grid container spacing={2} justifyContent={"flex-start"} alignItems={"center"}>
                                        {selectedAnamnesis?.symptoms.sort((a, b) => a.date.day - b.date.day).map((symptom, index) => (
                                            <Grid key={`${symptom.title}-${index}`} size={{ lg: 4, sm: 6, xs: 12 }}>
                                                <Card variant="outlined">
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar variant={'square'}>
                                                                {symptom.date.day}
                                                            </Avatar>
                                                        }
                                                        title={symptom.title}
                                                    />
                                                    <CardContent>

                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                        <Card variant="outlined">
                            <CardHeader
                                avatar={<SummarizeOutlined />}
                                title="Summary"
                            />
                            <CardContent>
                                <Card>
                                    <CardHeader
                                        title={`Selected date: ${selectedDate ? selectedDate.format('MMMM D, YYYY') : 'None'}`}
                                    />
                                </Card>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/*{anamnesis.length > 0 ? anamnesis.map(anamnesisItem => (*/}
                    {/*    <AnamnesisItem*/}
                    {/*        key={anamnesisItem.id}*/}
                    {/*        anamnesisItem={anamnesisItem}*/}
                    {/*        expanded={expandedId === anamnesisItem.id}*/}
                    {/*        onExpandClick={handleExpandClick}*/}
                    {/*    />*/}
                    {/*)) : (*/}
                    {/*    <Grid size={{ sm: 6, xs: 12 }}>*/}
                    {/*        <NoAnamnesis />*/}
                    {/*    </Grid>*/}
                    {/*)}*/}
                </MedicalApplicationContentContainer>
            </Grid>
        </MedicalApplicationContentContainer>
    )
}