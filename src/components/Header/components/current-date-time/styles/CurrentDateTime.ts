import styled from 'styled-components';
import { colorBySeason } from '../../../../../utils/checkers/date.ts';

export const TimeContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
`;

export const Segment = styled.span`
    padding: 0 0.25rem;
`;

export const BlinkingColon = styled(Segment)<{ $show: boolean }>`
    opacity: ${props => (props.$show ? 1 : 0)};
    transition: opacity 0.5s;
    padding: 2px;
`;

export const DateSegment = styled(Segment)<{ $month: number }>`
    font-size: 1rem;
    color: rgb(${props => colorBySeason(props.$month)});
    text-shadow: 0 0 50px rgba(255, 255, 255, 1);
    margin-right: 1rem;
`;
