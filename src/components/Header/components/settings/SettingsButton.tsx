import {ReactElement} from "react";
import {Icon} from "../../../Icon";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {AnimatedContainer, ButtonContainer} from "./styles/SettingsButton.ts";
import {Tooltip} from "@mui/material";
import {useFinanceSettingsModalStore} from "../../../../stores/finance-app/modal/useFinanceSettingsModalStore.ts";

export const SettingsButton = (): ReactElement => {
    const {openModal} = useFinanceSettingsModalStore(state => state);

    return (
        <ButtonContainer onClick={openModal}>
            <Tooltip title="Settings">
                <AnimatedContainer>
                    <Icon icon={faGear} />
                </AnimatedContainer>
            </Tooltip>
        </ButtonContainer>
    )
}