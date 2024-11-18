import {ReactElement} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

interface IconProps {
    icon: IconDefinition;
    size?: SizeProp;
    color?: string;
}

export const Icon = ({icon, size = undefined}: IconProps): ReactElement =>
    <FontAwesomeIcon icon={icon} size={size} />;