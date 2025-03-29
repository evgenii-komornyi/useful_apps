import { FC } from 'react';
import { SortingMenu } from './SortingMenu';
import { ToolbarProps } from '../Toolbar';

export const Sorting: FC<ToolbarProps> = ({ idx }) => {
    return <SortingMenu idx={idx} />;
};
