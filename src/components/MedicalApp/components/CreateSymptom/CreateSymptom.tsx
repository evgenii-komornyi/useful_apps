import { FC, Fragment, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Collapse,
    Divider,
    Grid2 as Grid,
    IconButton,
    TextField
} from '@mui/material';
import { AddCircleOutlineOutlined, ExpandCircleDownOutlined, PsychologyAltOutlined } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { SymptomData, SymptomViewType } from '../../../../utils/common.ts';

export const CreateSymptom: FC = () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [symptomFields, setSymptomFields] = useState<SymptomData[]>([]);

    const handleAddSymptomParameter = () => {
        setSymptomFields(prevProfitFields => [
            ...prevProfitFields,
            {
                id: uuidv4(),
                title: '',
                type: SymptomViewType.Text
            }]
        )
    }

    useEffect(() => {
        setSymptomFields([{
                id: uuidv4(),
                title: '',
                type: SymptomViewType.Text
            }]
        )
    }, []);

    return (
        <Grid size={{ xs:12, sm:4}}>
            <Card variant="outlined">
                <CardHeader
                    title="Create Symptom"
                    subheader="This is common data"
                    avatar={<PsychologyAltOutlined />}
                    action={
                        <IconButton
                            onClick={() => setExpanded(prev => !prev)}
                        >
                            <ExpandCircleDownOutlined sx={{transform: `rotate(${expanded ? '180deg' : ''})`}} />
                        </IconButton>
                    }
                />
                <Collapse in={expanded}>
                    <CardContent>
                        <Box sx={{ pr: 2, pl: 2, pb: 2 }}>
                            <TextField
                                label="Symptom"
                                variant="outlined"
                                size="small"
                                slotProps={{
                                    htmlInput: {
                                        'aria-label': "Symptom title",
                                    }
                                }}
                                required
                                fullWidth
                            />
                        </Box>
                        <Divider>
                            <Chip
                                variant='outlined'
                                label='Add Symptom Parameters'
                                icon={<AddCircleOutlineOutlined fontSize="small" />}
                                onClick={handleAddSymptomParameter}
                            />
                        </Divider>
                        <Box sx={{ pr: 2, pl: 2, pb: 2, mt: 2 }}>
                            <Grid container alignItems="center" spacing={2}>
                                {
                                    symptomFields.map(symptomField => (
                                        <Fragment key={symptomField.id}>
                                            <Grid size={{xs: 6}}>
                                                <TextField
                                                    label="Parameter"
                                                    variant="outlined"
                                                    size="small"
                                                    slotProps={{
                                                        htmlInput: {
                                                            'aria-label': "Symptom parameter title",
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid size={{xs: 6}} textAlign="center">
                                                <TextField
                                                    label="Type"
                                                    variant="outlined"
                                                    size="small"
                                                    slotProps={{
                                                        htmlInput: {
                                                            'aria-label': "Symptom parameter type",
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                        </Fragment>
                                    ))}
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button variant='outlined'>Create and save</Button>
                    </CardActions>
                </Collapse>
            </Card>
        </Grid>
    );
}