import styled, {css, RuleSet} from "styled-components";
import {colorBySeason} from "../../../../../../../utils/checkers/date.ts";

const checkIsToday = (isActive: boolean, month: number): RuleSet => {
    return isActive
        ? css`
                box-shadow: 0 0 10px 5px rgba(${colorBySeason(month)}, ${isActive ? 0.7 : 0.3});
        `
        : css`
                box-shadow: 0 0 5px 4px rgba(${colorBySeason(month)}, ${isActive ? 0.7 : 0.3});
        `;
}

export const CardDate = styled.div`
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.6s ease-in-out;
`

export const CardDateTitle = styled.h1`
    padding: 5px 30px;
    text-transform: uppercase;
    width: 300px;
    text-align: center;
    font-size: 1.5rem;
    background: #000;
    border-radius: 10px;
    box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.7);
    transition: box-shadow 0.6s ease-in-out;
`

export const CardWrapper = styled.div<{$month: number}>`
    position: relative;
    margin-bottom: 30px;
    
    &:hover ${CardDate} {
        top: -25px;
    }
    
    &:hover ${CardDateTitle} {
        box-shadow: 0 0 10px 5px rgba(${props => colorBySeason(props.$month)}, 0.7);
        transition: box-shadow 0.6s ease-in-out;
    }
`

export const CardContainer = styled.div<{$isActive: boolean, $month: number}>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: black;
    padding: 50px 10px;
    height: 70vh;
    border-radius: 15px;
    margin: 5px 10px;
    transition: box-shadow 0.2s linear;
    
    ${props => checkIsToday(props.$isActive, props.$month)}
    
    &:hover {
        box-shadow: 0 0 10px 5px rgba(${props => colorBySeason(props.$month)}, 0.7);
        transition: box-shadow 0.2s linear;
    }
`

export const CardContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 70vh;
    padding: 10px 20px;    
    overflow-y: auto;
    
    & .MuiDivider-root {
        width: 100%;
    }
`