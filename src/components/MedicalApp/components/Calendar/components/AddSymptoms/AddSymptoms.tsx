import {
    Button,
    CardContent,
    Chip,
    Slider,
    Stack,
    TextField,
} from '@mui/material';
import { DeleteTwoTone, NoteAddOutlined } from '@mui/icons-material';
import { ChangeEvent, FC, useState } from 'react';
import {
    IAnamnesis,
    ISymptom,
    SymptomDate,
    SymptomType,
} from '../../../../../../utils/common.ts';
import { useAnamnesisStore } from '../../../../../../stores/medical-app/anamnesis/useAnamnesisStore.ts';
import { CUSTOM_ICONS } from '../../../../../../constants/common.tsx';
import { Dayjs } from 'dayjs';
import { v4 as uuid } from 'uuid';

interface Props {
    symptoms?: ISymptom[];
    date?: Dayjs;
    onClose: () => void;
}

export const AddSymptoms: FC<Props> = ({ date, symptoms, onClose }) => {
    const {
        addSymptom: addSymptomToAnamnesis,
        anamnesis,
        addAnamnesis,
    } = useAnamnesisStore(state => state);

    const [symptomTitle, setSymptomTitle] = useState<string>('');
    const [symptomsState, setSymptomsState] = useState<SymptomType[]>([]);
    const [painRate, setPainRate] = useState<1 | 2 | 3>(3);

    const availableSymptoms: SymptomType[] = [
        SymptomType.Headache,
        SymptomType.AcidIndigestion,
    ];

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSymptomTitle(e.target.value);
    };

    const addSymptom = (symptom: SymptomType) => {
        setSymptomsState(prev => [...prev, symptom]);
    };

    const removeSymptom = (symptom: SymptomType) => {
        setSymptomsState(prev => prev.filter(s => s !== symptom));
    };

    const resetStats = () => {
        setSymptomsState([]);
        setSymptomTitle('');
        setPainRate(3);
        onClose();
    };

    const addSymptoms = (dateToSave: SymptomDate, anamnesisId: string) => {
        symptomsState.forEach(s => {
            const symptomToSave: ISymptom = {
                title: s,
                date: dateToSave,
                ...(s === SymptomType.Headache ? { painRate } : { food: [] }),
            };
            addSymptomToAnamnesis(anamnesisId, symptomToSave);
        });
    };

    const saveToAnamnesis = () => {
        const existingAnamnesis: IAnamnesis = anamnesis.find(
            anamnesisItem =>
                anamnesisItem.month === date?.month() &&
                anamnesisItem.year === date?.year(),
        )!;

        if (date) {
            const dateToSave: SymptomDate = {
                year: date.year(),
                month: date.month(),
                day: date.date(),
            };

            resetStats();

            if (!existingAnamnesis) {
                const newAnamnesis: IAnamnesis = {
                    id: uuid(),
                    month: date.month(),
                    year: date.year(),
                    symptoms: [],
                };
                addAnamnesis(newAnamnesis);
                addSymptoms(dateToSave, newAnamnesis.id);
            } else {
                addSymptoms(dateToSave, existingAnamnesis.id);
            }
        }
        /*const now: Date = new Date();
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

        resetStats();*/
    };

    const isTodayDisabled = (symptom: SymptomType) =>
        symptoms?.some(
            s =>
                s.date.day === date?.date() &&
                s.date.month === date?.month() &&
                s.date.year === date?.year() &&
                s.title === symptom,
        );

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
                    .filter(s =>
                        s.toLowerCase().includes(symptomTitle.toLowerCase()),
                    )
                    .map(availableSymptom => (
                        <Chip
                            key={availableSymptom}
                            variant="outlined"
                            label={availableSymptom}
                            color={
                                !isTodayDisabled(availableSymptom) &&
                                !symptomsState.some(s => s === availableSymptom)
                                    ? 'default'
                                    : 'success'
                            }
                            disabled={isTodayDisabled(availableSymptom)}
                            {...(symptomsState.some(
                                s => s === availableSymptom,
                            ) && {
                                deleteIcon: <DeleteTwoTone />,
                                onDelete: () => removeSymptom(availableSymptom),
                            })}
                            onClick={() => addSymptom(availableSymptom)}
                        />
                    ))}
            </Stack>
            {symptomsState.some(s => s === SymptomType.Headache) && (
                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    sx={{
                        mt: 4,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Chip
                        label={`Pain rate: ${painRate ? CUSTOM_ICONS[painRate].label : ''}`}
                        color={
                            painRate
                                ? CUSTOM_ICONS[painRate].color
                                : 'secondary'
                        }
                        variant="outlined"
                    />
                    <Stack
                        direction="row"
                        spacing={3}
                        width={200}
                        alignItems="center"
                    >
                        {CUSTOM_ICONS[painRate].icon}
                        <Slider
                            value={painRate}
                            onChange={(_, newValue) =>
                                setPainRate(newValue as 1 | 2 | 3)
                            }
                            aria-labelledby="input-slider"
                            step={1}
                            min={1}
                            max={3}
                            marks
                            color={
                                painRate
                                    ? CUSTOM_ICONS[painRate].color
                                    : 'secondary'
                            }
                        />
                    </Stack>
                </Stack>
            )}
            {symptomsState.some(s => s === SymptomType.AcidIndigestion) && (
                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    sx={{
                        mt: 4,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
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
    );
};
