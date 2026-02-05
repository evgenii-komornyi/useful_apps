import { Card, CardContent, CardHeader, Skeleton, Typography } from '@mui/material';
import { AddAnamnesis } from '../../../Header/components/medical-app-toolbar/AddAnamnesis';
import { FC } from 'react';

export const NoAnamnesis: FC = () => {
    return (
        <Card variant="outlined">
            <CardHeader
                avatar={<Skeleton variant="circular" width={40} height={40} animation="wave" />}
                action={
                    <AddAnamnesis />
                }
                title="No data for anamnesis."
                subheader="Please, add it."
            />
            <CardContent>
                <Typography variant='body1'>Here be your data.</Typography>
            </CardContent>
        </Card>
    )
}