import { FC } from 'react';
import { Badge, Card, CardContent, CardHeader, Chip, Stack, Tooltip } from '@mui/material';
import { ISymptom } from '../../../../../../utils/common.ts';
import { CUSTOM_ICONS } from '../../../../../../constants/common.tsx';

interface Props {
    symptom: ISymptom;
}

export const SymptomItem: FC<Props> = ({ symptom: { date, title, painRate } }) => {
    return (
        <Card>
            <CardHeader
                avatar={<Chip variant="filled" size="small" color="primary" label={date.day} />}
                title={title}
            />
            <CardContent>
                <Stack direction="column" spacing={2} alignItems="center">
                    <Tooltip title="Pain Rate">
                        <Badge variant="standard" badgeContent={painRate} color={CUSTOM_ICONS[painRate].color} >
                            <Chip
                                label={CUSTOM_ICONS[painRate].label}
                                variant="outlined"
                                color={CUSTOM_ICONS[painRate].color}
                                icon={CUSTOM_ICONS[painRate].icon}
                            />
                        </Badge>
                    </Tooltip>
                </Stack>
            </CardContent>
        </Card>
    )
}