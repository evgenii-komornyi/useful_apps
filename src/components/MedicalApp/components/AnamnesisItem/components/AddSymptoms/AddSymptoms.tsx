import { Button, CardContent, Chip, Rating, Stack, TextField } from '@mui/material';
import { DeleteTwoTone, NoteAddOutlined } from '@mui/icons-material';
import { ChangeEvent, FC, useState } from 'react';
import { ISymptom, SymptomDate, SymptomType } from '../../../../../../utils/common.ts';
import { useAnamnesisStore } from '../../../../../../stores/medical-app/anamnesis/useAnamnesisStore.ts';
import { styled } from '@mui/material/styles';
import { CUSTOM_ICONS } from '../../../../../../constants/common.tsx';
import { IconContainer } from '../PainRate.util.tsx';

interface Props {
    anamnesisId: string;
    symptoms: ISymptom[];
}

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.active,
    },
}));

export const AddSymptoms: FC<Props> = ({ anamnesisId, symptoms}) => {
    const { addSymptom: addSymptomToAnamnesis } = useAnamnesisStore();

    const [symptomTitle, setSymptomTitle] = useState<string>('');
    const [symptomsState, setSymptomsState] = useState<SymptomType[]>([]);
    const [painRate, setPainRate] = useState<1 | 2 | 3 | 4 | 5>(5);

    const availableSymptoms: SymptomType[] = [SymptomType.Headache, SymptomType.AcidIndigestion];


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSymptomTitle(e.target.value);
    }

    const addSymptom = (symptom: SymptomType) => {
        setSymptomsState(prev => [...prev, symptom]);
    }

    const removeSymptom = (symptom: SymptomType) => {
        setSymptomsState(prev => prev.filter(s => s !== symptom));
    }

    const resetStats = () => {
        setSymptomsState([]);
        setSymptomTitle('');
        setPainRate(5);
    }

    const saveToAnamnesis = () => {
        const now: Date = new Date();
        const dateToSave: SymptomDate = {
            year: now.getFullYear(),
            month: now.getMonth(),
            day: now.getDate()
        }

        symptomsState.forEach(s => {
            const symptomToSave: ISymptom = {
                title: s,
                date: dateToSave,
                ...(s === SymptomType.Headache ? { painRate } : {food: []})
            }
            addSymptomToAnamnesis(anamnesisId, symptomToSave)
        });

        resetStats();
    }

    return (
        <CardContent>
            <TextField
                variant="outlined"
                size="small"
                fullWidth
                label="Symptom"
                value={symptomTitle}
                onChange={onChangeHandler}
            />
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                {availableSymptoms
                    .filter(s => s.toLowerCase().includes(symptomTitle.toLowerCase())).map(availableSymptom => (
                        <Chip
                            key={availableSymptom}
                            variant="outlined"
                            label={availableSymptom}
                            color={
                                !symptoms.some(s => s.title === availableSymptom) &&
                                !symptomsState.some(s => s === availableSymptom) ?
                                    'default' : 'success'
                            }
                            disabled={symptoms.some(s => s.title === availableSymptom)}
                            {...(symptomsState.some(s => s === availableSymptom) && {
                                deleteIcon: <DeleteTwoTone />,
                                onDelete: () => removeSymptom(availableSymptom)
                            })}
                            onClick={() => addSymptom(availableSymptom)}
                        />
                    ))}
            </Stack>
            {symptomsState.some(s => s === SymptomType.Headache) && (
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Chip label={`Rate your symptoms pain: ${painRate ? CUSTOM_ICONS[painRate].label : ''}`} color={painRate ? CUSTOM_ICONS[painRate].color : "secondary"} variant="outlined" />
                    <StyledRating
                        name="highlight-selected-only"
                        value={painRate}
                        onChange={(_, newValue) => {
                            setPainRate(newValue ? newValue as 1 | 2 | 3 | 4 | 5 : 5);
                        }}
                        IconContainerComponent={IconContainer}
                        getLabelText={(value: number) => CUSTOM_ICONS[value].label}
                        highlightSelectedOnly
                    />
                </Stack>
            )}
            {symptomsState.some(s => s === SymptomType.AcidIndigestion) && (
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Chip label="Food: " color="secondary" variant="outlined" />
                </Stack>
            )}

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 4 }}>
                <Button
                    variant="outlined"
                    size="small"
                    color="warning"
                    startIcon={<NoteAddOutlined />}
                    onClick={saveToAnamnesis}
                >
                    save to anamnesis
                </Button>
            </Stack>
        </CardContent>
    )
}