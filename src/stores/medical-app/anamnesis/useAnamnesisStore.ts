import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IAnamnesis, IAnamnesisState, ISymptom } from '../../../utils/common.ts';

export const useAnamnesisStore = create<IAnamnesisState>()(
    devtools(
        persist(set => ({
            anamnesis: [],

            setAnamnesis: (newAnamnesis: IAnamnesis[]) => {
                set({ anamnesis: newAnamnesis });
            },

            addAnamnesis: (newAnamnesis: IAnamnesis) => {
                set(state => ({ anamnesis: [...state.anamnesis, newAnamnesis] }));
            },

            removeAnamnesis: (id: string) => {
                set(state => ({ anamnesis: state.anamnesis.filter(anamnesis => anamnesis.id !== id) }));
            },

            addSymptom: (anamnesisId: string, symptom: ISymptom) => {
                set(state => ({
                    anamnesis: state.anamnesis.map(anamnesis => anamnesis.id === anamnesisId ? {
                        ...anamnesis,
                        symptoms: [...anamnesis.symptoms, symptom]
                    } : anamnesis)
                }));
            },

            removeSymptom: (anamnesisId: string, symptom: ISymptom) => {
                set(state => ({
                    anamnesis: state.anamnesis.map(anamnesis => anamnesis.id === anamnesisId ? {
                        ...anamnesis,
                        symptoms: anamnesis.symptoms.filter(s => s !== symptom)
                    } : anamnesis)
                }));
            },
        }),

        { name: 'userAnamnesis' })
    )
);