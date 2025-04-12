import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5rem;
    flex-direction: row;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        padding: 1rem;
    }
`;

export const ControlContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;
