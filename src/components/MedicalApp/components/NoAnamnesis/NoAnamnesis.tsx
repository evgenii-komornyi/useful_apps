import { Card, CardContent, CardHeader, Skeleton } from '@mui/material';
import { AddAnamnesis } from '../../../Header/components/medical-app-toolbar/AddAnamnesis';
import Grid from '@mui/material/Grid2';
import { FC } from 'react';

export const NoAnamnesis: FC = () => {
    return (
        <Card variant="outlined">
            <CardHeader
                avatar={<Skeleton variant="circular" width={40} height={40} animation="wave" />}
                action={
                    <AddAnamnesis />
                }
                title={<Skeleton variant="text" width="40%" animation="wave" />}
                subheader={<Skeleton variant="text" width="30%" animation="wave" />}
            />
            <CardContent>
                <Grid container spacing={2}>
                    {Array.from({ length: 9 }).map((_, index) => (
                        <Grid key={index} size={{ sm: 4 }}>
                            <Card>
                                <CardHeader
                                    avatar={<Skeleton variant="circular" width={32} height={32} animation="wave" />}
                                    title={<Skeleton variant="text" width="60%" animation="wave" />}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}