import styled from "styled-components";
import {Box} from "@mui/material";

export const AnimatedIconContainer = styled.span`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    aspect-ratio: 1;
    font-size: 1.5rem;
    color: #fff;
    background-color: black;
    border-radius: 50%;
    transition: color 0.5s ease-in-out;
    cursor: pointer;
    margin-bottom: 20px;

    &::after {
        position: absolute;
        z-index: -1;
        content: '';
        inset: -3px;
        border-radius: inherit;
        background: conic-gradient(gold var(--fill), transparent var(--fill));
        transition: --fill 0.6s ease-in-out;
    }
`;

export const ApplicationBoxContainer = styled(Box)`
    && {
        min-width: 300px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px 20px;
        border-radius: 20px;
        border: 1px solid floralwhite;
        transition: color 0.5s ease-in-out, box-shadow 0.3s ease, margin-bottom 0.3s ease-in-out;

        &:hover {
            box-shadow: 0 10px 20px rgba(187, 234, 116, 0.6);
            margin-bottom: 20px;
        }

        &:hover ${AnimatedIconContainer} {
            color: greenyellow;
            --fill: 100%;
        }
    }
`;

export const ApplicationTitle = styled.h3`
    letter-spacing: 3px;
    text-transform: uppercase;
`