import { FC, useState } from 'react';
import {
    Grid2 as Grid,
} from '@mui/material';
import { MedicalApplicationContentContainer } from './styles/MedicalApp.tsx';
import { useAnamnesisStore } from '../../stores/medical-app/anamnesis/useAnamnesisStore.ts';
import { AnamnesisItem } from './components/AnamnesisItem';
import { NoAnamnesis } from './components/NoAnamnesis';

export const MedicalApp: FC = () => {
    const { anamnesis } = useAnamnesisStore(state => state);

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleExpandClick = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <MedicalApplicationContentContainer container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <MedicalApplicationContentContainer container spacing={2}>
                    {anamnesis.length > 0 ? anamnesis.map(anamnesisItem => (
                        <AnamnesisItem
                            key={anamnesisItem.id}
                            anamnesisItem={anamnesisItem}
                            expanded={expandedId === anamnesisItem.id}
                            onExpandClick={handleExpandClick}
                        />
                    )) : (
                        <Grid size={{ sm: 6, xs: 12 }}>
                            <NoAnamnesis />
                        </Grid>
                    )}
                </MedicalApplicationContentContainer>
            </Grid>
        </MedicalApplicationContentContainer>
    )
}