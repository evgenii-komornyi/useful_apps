import { FC } from 'react';
import { IAnamnesis } from '../../../../utils/common.ts';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Collapse,
    IconButton,
    Typography,
} from '@mui/material';
import { useFinanceSettingsStore } from '../../../../stores/finance-app/settings/useSettingsStore.ts';
import Grid from '@mui/material/Grid2';
import { formatDateByLocale } from '../../../../utils/formatters/dates.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarPlus,
    faCalendarXmark,
} from '@fortawesome/free-regular-svg-icons';
import { SymptomItem } from './components/SymptomItem';
import { isToday } from '../../../../utils/checkers/date.ts';
import { DeleteOutline } from '@mui/icons-material';
import { useAnamnesisStore } from '../../../../stores/medical-app/anamnesis/useAnamnesisStore.ts';
import { ReportGeneration } from './components/ReportGeneration';

interface Props {
    anamnesisItem: IAnamnesis;
    expanded: boolean;
    onExpandClick: (anamnesisId: string) => void;
}

export const AnamnesisItem: FC<Props> = ({
    anamnesisItem: { id, year, month, symptoms },
    expanded,
    onExpandClick,
}) => {
    const { user } = useFinanceSettingsStore(state => state);
    const { removeAnamnesis } = useAnamnesisStore(state => state);

    const handleExpandClick = () => {
        onExpandClick(id);
    };

    return (
        <Grid size={{ sm: 6, xs: 12 }}>
            <Card variant="outlined">
                <CardHeader
                    avatar={
                        <Chip
                            variant="outlined"
                            label={`${formatDateByLocale(
                                user.locale,
                                new Date(year, month),
                            )}`}
                        />
                    }
                    title="Anamnesis"
                    subheader={`Days per month with symptoms: ${new Set([...symptoms]).size}`}
                    action={
                        <IconButton
                            aria-label="Delete anamnesis"
                            onClick={() => removeAnamnesis(id)}
                        >
                            <DeleteOutline />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Grid container textAlign="center" spacing={2}>
                        {symptoms.length > 0 ? (
                            symptoms.map((symptom, index) => (
                                <Grid
                                    key={index}
                                    size={{ lg: 4, sm: 6, xs: 12 }}
                                >
                                    <SymptomItem
                                        anamnesisId={id}
                                        symptom={symptom}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Typography variant={'body1'}>
                                No Symptoms
                            </Typography>
                        )}
                    </Grid>
                </CardContent>
                <CardActions disableSpacing>
                    {isToday(month, year) && (
                        <Card variant="outlined" sx={{ width: '100%' }}>
                            <CardHeader
                                avatar={
                                    <Chip
                                        color="primary"
                                        label={new Date().getDate()}
                                        size="small"
                                    />
                                }
                                title="Add symptom"
                                subheader={`the symptom will be added for ${formatDateByLocale(
                                    user.locale,
                                    new Date(year, month, new Date().getDate()),
                                    false,
                                    true,
                                    true,
                                )}`}
                                action={
                                    <IconButton
                                        aria-label="add symptom"
                                        aria-expanded={expanded}
                                        onClick={handleExpandClick}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                !expanded
                                                    ? faCalendarPlus
                                                    : faCalendarXmark
                                            }
                                            size="sm"
                                        />
                                    </IconButton>
                                }
                            />
                        </Card>
                    )}
                    {!isToday(month, year) && <ReportGeneration />}
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {/*<AddSymptoms anamnesisId={id} symptoms={symptoms} />*/}
                </Collapse>
            </Card>
        </Grid>
    );
};
