import { FC } from 'react';
import { Checkbox, FormControlLabel, Grid2 as Grid } from '@mui/material';

interface Props {
    allKeys: string[];
    selectedKeys: string[];
    onToggle: (key: string) => void;
}

const capitalizeLabel = (key: string) =>
    key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

export const ExpenseSelector: FC<Props> = ({
    allKeys,
    selectedKeys,
    onToggle,
}) => {
    return (
        <Grid container spacing={1} sx={{ mb: 2 }}>
            {allKeys.map(key => {
                const checked = selectedKeys.includes(key);
                const checkboxId = `checkbox-${key}`;

                return (
                    <Grid key={key} item size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id={checkboxId}
                                    checked={checked}
                                    onChange={() => onToggle(key)}
                                    inputProps={{
                                        'aria-label': capitalizeLabel(key),
                                    }}
                                />
                            }
                            label={capitalizeLabel(key)}
                            htmlFor={checkboxId}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};
