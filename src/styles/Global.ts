import styled, { createGlobalStyle } from 'styled-components';
import { Grid2 as Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Align, Direction, Justify, Position } from '../utils/common';
import MUIBox from '@mui/material/Box';

export const ApplicationsContentContainer = styled(Grid)`
    justify-content: center;
    align-items: center;
    height: 80vh;
    overflow-y: scroll;
    border: 1px solid white;
`;

export const GlobalStyle = createGlobalStyle`
  @property --fill {
    syntax: '<percentage>';
    initial-value: 0%;
    inherits: true;
  }

  @property --angle{
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
  }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 70px;
`;

export const Main = styled.div`
    flex: 1;
`;

export const NavLink = styled(Link)`
    text-decoration: none;
    color: floralwhite;
`;

export const Box = styled(MUIBox)<{
    $direction: Direction;
    $justifyContent: Justify;
}>`
    && {
        display: flex;
        flex-direction: ${({ $direction }) => $direction};
        justify-content: ${({ $justifyContent }) => $justifyContent};
    }
`;

export const MainBoxContainer = styled(Box)<{ $alignItems: Align }>`
    && {
        align-items: ${({ $alignItems }) => $alignItems};
    }

    .files-ui-file-mosaic-main-container .files-ui-file-mosaic-file-name {
        color: white;
        margin-top: 3px;
        font-size: 12px;
    }
`;

export const PositionedBox = styled(MUIBox)<{ $position: Position }>`
    display: flex;
    position: ${({ $position }) => $position};
    width: 100%;
    justify-content: center;
    align-items: center;
`;
