import {ReactElement} from "react";
import {Container} from "@mui/material";
import {FinanceApp} from "../../components/FinanceApp";

export const Finance = (): ReactElement => {
    return (
        <Container maxWidth='xl' sx={{mt:3}}>
            <FinanceApp />
        </Container>
    )
}