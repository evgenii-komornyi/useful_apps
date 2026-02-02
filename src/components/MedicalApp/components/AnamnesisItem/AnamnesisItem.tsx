import { FC } from 'react';
import { IAnamnesis } from '../../../../utils/common.ts';
import {
    Card,
    CardActions, CardContent,
    CardHeader,
    Chip,
    Collapse,
    IconButton, Skeleton
} from '@mui/material';
import { useFinanceSettingsStore } from '../../../../stores/finance-app/settings/useSettingsStore.ts';
import Grid from '@mui/material/Grid2';
import { formatDateByLocale } from '../../../../utils/formatters/dates.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faCalendarXmark } from '@fortawesome/free-regular-svg-icons';
import { AddSymptoms } from './components/AddSymptoms';
import { SymptomItem } from './components/SymptomItem';
import { isToday } from '../../../../utils/checkers/date.ts';
import { AddchartOutlined, DeleteOutline, QueryStatsOutlined } from '@mui/icons-material';
import { useSnackbarStore } from '../../../../stores/common/snackbar/useSnackbarStore.ts';
import { SnackbarAlert } from '../../../SnackbarAlert';
import { useAnamnesisStore } from '../../../../stores/medical-app/anamnesis/useAnamnesisStore.ts';

interface Props {
    anamnesisItem: IAnamnesis
    expanded: boolean;
    onExpandClick: (anamnesisId: string) => void;
}

export const AnamnesisItem: FC<Props> = ({ anamnesisItem: { id, year, month, symptoms }, expanded, onExpandClick }) => {
    const { setIsOpened } = useSnackbarStore(state => state);
    const { user } = useFinanceSettingsStore(state => state);
    const { removeAnamnesis } = useAnamnesisStore(state => state);

    const handleExpandClick = () => {
        onExpandClick(id);
    };

    const openDeleteAnamnesisAlert = () => {
        setIsOpened(true, 'deleteAnamnesis');
    }

    const handleGenerateReportClick = () => {
        alert(`Here be your dragon soon`);
    }

    const deleteAnamnesis = () => {
        removeAnamnesis(id);
        setIsOpened(false, 'deleteAnamnesis');
    }

    return (
        <Grid size={{ sm: 6, xs: 12 }}>
            <Card variant="outlined">
                <CardHeader
                    avatar={
                        <Chip variant="outlined"
                              label={
                                  `${formatDateByLocale(
                                      user.locale,
                                      new Date(year, month)
                                  )}`
                              }
                        />
                    }
                    title="Anamnesis"
                    subheader={`Days per month with symptoms: ${(new Set([...symptoms])).size}`}
                    action={
                        <IconButton
                            aria-label="Delete anamnesis"
                            onClick={openDeleteAnamnesisAlert}
                        >
                            <DeleteOutline />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Grid container textAlign="center" spacing={2}>
                        {symptoms.length > 0 ? symptoms.map((symptom, index) => (
                            <Grid key={index} size={{lg: 4, sm: 6, xs: 12}}>
                                <SymptomItem anamnesisId={id} symptom={symptom} />
                            </Grid>
                        )) : (
                            Array.from({ length: 9 }).map((_, index) => (
                                <Grid key={index} size={{sm: 4}}>
                                    <Card>
                                        <CardHeader
                                            avatar={<Skeleton variant="circular" width={32} height={32} animation="wave" />}
                                            title={<Skeleton variant="text" width="60%" animation="wave" />}
                                        />
                                    </Card>
                                </Grid>
                            )))}
                    </Grid>
                </CardContent>
                <CardActions disableSpacing>
                    {isToday(month, year) && (
                        <Card variant="outlined" sx={{ width: '100%' }}>
                            <CardHeader
                                avatar={
                                    <Chip color="primary" label={new Date().getDate()} size="small" />
                                }
                                title="Add symptom"
                                subheader={`the symptom will be added for ${formatDateByLocale(
                                    user.locale,
                                    new Date(year, month, new Date().getDate()),
                                    false,
                                    true,
                                    true
                                )}`}
                                action={
                                    <IconButton
                                        aria-label="add symptom"
                                        aria-expanded={expanded}
                                        onClick={handleExpandClick}
                                    >
                                        <FontAwesomeIcon icon={!expanded ? faCalendarPlus : faCalendarXmark} size="sm" />
                                    </IconButton>
                                }
                            />
                        </Card>
                    )}
                    {!isToday(month, year) && (
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
                    )}
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <AddSymptoms anamnesisId={id} symptoms={symptoms} />
                </Collapse>
            </Card>
            <SnackbarAlert
                message="Do you want to delete this anamnesis?"
                severity="warning"
                type="deleteAnamnesis"
                hasConfirm={true}
                hasAction={true}
                onClick={deleteAnamnesis}
            />
        </Grid>
    )
}