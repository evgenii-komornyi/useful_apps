import styled from 'styled-components';
import { colorBySeason } from '../../../../../../../utils/checkers/date';

export const CardDate = styled.div`
    width: 100%;
`;

export const CardDateTitle = styled.h1`
    padding: 5px 30px;
    text-transform: uppercase;
    width: 100%;
    text-align: center;
    font-size: clamp(0.1rem, 1.5rem, 1.5rem);
`;

export const CardWrapper = styled.div<{ $month: number }>`
    position: relative;
    background: #101316;
    box-shadow: 0 0 5px 4px rgba(${({ $month }) => colorBySeason($month)}, 0.3);
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 5px 30px;
    transition: box-shadow 0.6s ease-in-out;

    &:hover {
        box-shadow: 0 0 5px 4px
            rgba(${({ $month }) => colorBySeason($month)}, 0.7);
    }
`;
