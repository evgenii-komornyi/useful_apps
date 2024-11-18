import styled, {createGlobalStyle} from "styled-components";
import {Grid2 as Grid} from "@mui/material";
import {Link} from "react-router-dom";

export const ApplicationsContentContainer = styled(Grid)`
    justify-content: center;
    align-items: center;
    height: 80vh;
    overflow-y: scroll;
    border: 1px solid white;
`

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
`

export const Main = styled.div`
    flex: 1;
`;


export const NavLink = styled(Link)`
    text-decoration: none;
    color: floralwhite;
`