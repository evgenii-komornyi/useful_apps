import { Box, Button } from '@mui/material';
import styled from 'styled-components';

export const MainWrapper = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
        position: relative;
        gap: 5;
    }
`;

export const ChildWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
`;

export const AddButtonContainer = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 50px;
`;

export const SaveButtonContainer = styled(Box)`
    display: flex;
    align-self: center;
    width: 100%;
`;

export const SaveButton = styled(Button)`
    && {
        margin: 0 auto;
    }
`;
