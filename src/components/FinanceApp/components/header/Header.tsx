import {ReactElement} from "react";
import {SettingsButton} from "./components/settings";
import {CurrentDateTime} from "./components/current-date-time";
import {ControlContainer, HeaderContainer} from "./styles/Header.ts";
import {GenerationMenu} from "./components/generation-menu";

export const Header = (): ReactElement => {
    return (
        <HeaderContainer>
            <CurrentDateTime />
            <ControlContainer>
                <GenerationMenu />
                <SettingsButton />
            </ControlContainer>
        </HeaderContainer>
    );
};