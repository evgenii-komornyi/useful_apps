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
                        <Badge variant="standard" badgeContent={painRate} color={painRate ? CUSTOM_ICONS[painRate].color : 'primary'} >
                            <Chip
                                label={painRate ? CUSTOM_ICONS[painRate].label : 'No Rating'}
                                variant="outlined"
                                color={painRate ? CUSTOM_ICONS[painRate].color : 'primary'}
                                icon={painRate && CUSTOM_ICONS[painRate].icon}
                            />
                        </Badge>
                    </Tooltip>
                </Stack>
            </CardContent>
        </Card>
    )
}