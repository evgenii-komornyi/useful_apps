import styled from "styled-components";

export const AnimatedContainer = styled.span`
    && {
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
        cursor: pointer;
        --fill: 0%;

        &:hover {
            --fill: 100%;
        }

        &::after {
            position: absolute;
            z-index: -1;
            content: '';
            inset: -3px;
            border-radius: inherit;
            background: conic-gradient(floralwhite var(--fill), transparent var(--fill));
            transition: --fill 0.6s ease-in-out;
        }
    }
`;

export const ButtonContainer = styled.div`
    padding: 10px;
`