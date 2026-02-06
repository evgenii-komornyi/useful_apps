import { FC } from 'react';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Grid2 as Grid,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { IAnamnesis } from '../../../../utils/common';

interface Props {
    selectedDate?: Dayjs;
    selectedAnamnesis?: IAnamnesis;
}

export const AnamnesisDetails: FC<Props> = ({
    selectedAnamnesis,
    selectedDate,
}) => {
    return (
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
                        {...(selectedAnamnesis && {
                            subheader: `${dayjs(`${selectedAnamnesis?.year}-${selectedAnamnesis?.month + 1}`).format('MMMM YYYY')}`,
                        })}
                    />
                    <CardContent>
                        <Grid
                            container
                            spacing={2}
                            justifyContent={'flex-start'}
                            alignItems={'center'}
                        >
                            {selectedAnamnesis?.symptoms
                                .sort((a, b) => a.date.day - b.date.day)
                                .map((symptom, index) => (
                                    <Grid
                                        key={`${symptom.title}-${index}`}
                                        size={{ lg: 4, sm: 6, xs: 12 }}
                                    >
                                        <Card variant="outlined">
                                            <CardHeader
                                                avatar={
                                                    <Avatar variant="square">
                                                        {symptom.date.day}
                                                    </Avatar>
                                                }
                                                title={symptom.title}
                                            />
                                            <CardContent></CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </Grid>
    );
};
