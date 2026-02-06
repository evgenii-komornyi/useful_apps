import { QueryStatsOutlined, AddchartOutlined } from '@mui/icons-material';
import { Card, CardHeader, IconButton } from '@mui/material';
import { FC, useEffect, useState } from 'react';

export const ReportGeneration: FC = () => {
    const [coords, setCoords] = useState<{
        latitude?: number;
        longitude?: number;
    }>({ latitude: undefined, longitude: undefined });

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setCoords({ latitude, longitude });
                },
                error => {
                    console.error('Error getting user location:', error);
                },
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            return;
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const handleGenerateReportClick = async () => {
        const response = await fetch(
            `https://power.larc.nasa.gov/api/temporal/daily/point?start=20251218&end=20251218&latitude=${coords.latitude}&longitude=${coords.longitude}&community=ag&parameters=T2M,PS`,
        );

        const data = await response.json();
        console.log(data);
    };

    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardHeader
                avatar={<QueryStatsOutlined />}
                title="Generate report"
                action={
                    <IconButton
                        aria-label="genegate report"
                        onClick={handleGenerateReportClick}
                    >
                        <AddchartOutlined />
                    </IconButton>
                }
            />
        </Card>
    );
};
