import { IconContainerProps } from '@mui/material';
import { CUSTOM_ICONS } from '../../../../../constants/common.tsx';

export const IconContainer = (props: IconContainerProps) => {
    const { value, ...other } = props;
    return <span {...other} style={{marginLeft: '10px'}}>{CUSTOM_ICONS[value].icon}</span>;
}