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
import { AddchartOutlined, QueryStatsOutlined } from '@mui/icons-material';

interface Props {
    anamnesisItem: IAnamnesis
    expanded: boolean;
    onExpandClick: (anamnesisId: string) => void;
}

export const AnamnesisItem: FC<Props> = ({ anamnesisItem: { id, year, month, symptoms }, expanded, onExpandClick }) => {
    const { user } = useFinanceSettingsStore(state => state);

    const handleExpandClick = () => {
        onExpandClick(id);
    };

    const handleGenerateReportClick = () => {
        alert(`Here be your dragon soon`);
    }

    return (
        <Grid size={{ sm:6, xs:12 }}>
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
                />
                <CardContent>
                    <Grid container textAlign="center" spacing={2}>
                        {symptoms.length > 0 ? symptoms.map((symptom, index) => (
                            <Grid key={index} size={{sm: 4, xs: 12}} spacing={2}>
                                <SymptomItem symptom={symptom} />
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
        </Grid>
    )
}