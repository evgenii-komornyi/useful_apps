import styled from 'styled-components';
import { Grid2 as Grid, IconButton } from '@mui/material';

export const FinanceApplicationContentContainer = styled(Grid)`
    display: flex;
    justify-content: center;
    position: relative;
`;

export const NavigationContainer = styled.div`
    position: absolute;
    top: 50%;
    z-index: 10;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const StyledButton = styled(IconButton)<{
    $left?: boolean;
    $right?: boolean;
}>`
    ${({ $left }) => $left && 'left: 10px;'}
    ${({ $right }) => $right && 'right: 10px;'}

    & > svg {
        ${({ $left }) => $left && 'transform: rotate(90deg);'}
        ${({ $right }) => $right && 'transform: rotate(-90deg);'}
    }

    &.swiper-button-disabled {
        opacity: 0.1;
    }
`;
