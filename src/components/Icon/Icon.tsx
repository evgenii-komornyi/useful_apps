import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RotateProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface IconProps {
    icon: IconDefinition;
    size?: SizeProp;
    rotation?: RotateProp;
    color?: string;
}

export const Icon: FC<IconProps> = ({
    icon,
    color = 'white',
    rotation = undefined,
    size = undefined,
}: IconProps) => (
    <FontAwesomeIcon
        icon={icon}
        size={size}
        color={color}
        rotation={rotation}
    />
);
