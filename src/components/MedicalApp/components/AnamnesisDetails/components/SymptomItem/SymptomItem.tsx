import { FC } from 'react';
import { Badge, Card, CardContent, CardHeader, Chip, IconButton, Stack, Tooltip } from '@mui/material';
import { ISymptom } from '../../../../../../utils/common.ts';
import { CUSTOM_ICONS } from '../../../../../../constants/common.tsx';
import { useSnackbarStore } from '../../../../../../stores/common/snackbar/useSnackbarStore.ts';
import { useAnamnesisStore } from '../../../../../../stores/medical-app/anamnesis/useAnamnesisStore.ts';
import { SnackbarAlert } from '../../../../../SnackbarAlert';
import { DeleteOutline } from '@mui/icons-material';

interface Props {
    anamnesisId: string;
    symptom: ISymptom;
}

export const SymptomItem: FC<Props> = ({ symptom, anamnesisId }) => {
    const { date, title, painRate } = symptom;
    const { setIsOpened } = useSnackbarStore(state => state);
    const { removeSymptom } = useAnamnesisStore(state => state);

    const openDeleteSymptomAlert = () => {
        setIsOpened(true, 'deleteSymptom');
    }

    const deleteSymptom = () => {
        setIsOpened(false, 'deleteSymptom');
        removeSymptom(anamnesisId, symptom);
    }

    return (
        <Card>
            <CardHeader
                avatar={<Chip variant="filled" size="small" color="primary" label={date.day} />}
                title={title}
                action={<IconButton
                    aria-label="Delete symptom"
                    onClick={openDeleteSymptomAlert}
                >
                    <DeleteOutline />
                </IconButton>}
            />
            <CardContent>
                <Stack direction="column" spacing={2} alignItems="center">
                    <Tooltip title="Pain Rate">
                        <Badge variant="standard" badgeContent={painRate}
                               color={painRate ? CUSTOM_ICONS[painRate].color : 'primary'}>
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
            <SnackbarAlert
                message="Do you want to delete this symptom?"
                severity="warning"
                type="deleteSymptom"
                hasConfirm={true}
                hasAction={true}
                onClick={deleteSymptom}
            />
        </Card>
    );
}