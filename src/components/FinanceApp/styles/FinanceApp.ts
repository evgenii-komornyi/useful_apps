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

export const ToolbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

export const ControlContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const ItemDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 5px;
    transition: all 0.5s ease-in;

    &:not(:first-child) {
        border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    &:not(:last-child) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    &:hover:not(:first-child) {
        border-top: 2px solid rgba(255, 255, 255, 0.8);
    }

    &:hover:not(:last-child) {
        border-bottom: 2px solid rgba(255, 255, 255, 0.8);
    }
`;
