import { FC } from 'react';
import { Box } from '../../../../../../../../../../styles/Global';
import {
    Align,
    Direction,
    Justify,
} from '../../../../../../../../../../utils/common';
import { Searchbar } from './Searchbar';
import { Sorting } from './Sorting';

export interface ToolbarProps {
    idx?: number;
}

export const Toolbar: FC<ToolbarProps> = ({ idx }) => {
    return (
        <Box
            $direction={Direction.Row}
            $justifyContent={Justify.SpaceBetween}
            alignItems={Align.Center}
            sx={{
                mt: 2,
                mb: 2,
            }}
        >
            <Searchbar idx={idx} />
            <Sorting idx={idx} />
        </Box>
    );
};
