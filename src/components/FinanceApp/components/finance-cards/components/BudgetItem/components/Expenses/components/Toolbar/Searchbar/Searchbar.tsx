import { ChangeEvent, FC, useState } from 'react';
import { Box } from '../../../../../../../../../../../styles/Global';
import {
    Direction,
    IconSize,
    Justify,
} from '../../../../../../../../../../../utils/common';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useFilterStore } from '../../../../../../../../../../../stores/finance-app/filter/filterStore';
import { ToolbarProps } from '../Toolbar';

export const Searchbar: FC<ToolbarProps> = ({ idx }) => {
    const [isSearchFieldHidden, setIsSearchFieldHidden] =
        useState<boolean>(true);

    const [searchVal, setSearchVal] = useState<string>('');

    const { setSearchValue, selectCard } = useFilterStore(state => state);

    const onChangeHandler = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setSearchVal(value);
        setSearchValue(value);
    };

    const openField = (): void => {
        setIsSearchFieldHidden(false);
        selectCard(idx);
    };

    const looseFocus = () => {
        setIsSearchFieldHidden(true);
        setSearchValue(undefined);
        setSearchVal('');
        selectCard(undefined);
    };

    const iconSize: IconSize = idx === undefined ? 'large' : 'small';

    return (
        <Box $direction={Direction.Row} $justifyContent={Justify.SpaceBetween}>
            {isSearchFieldHidden ? (
                <Tooltip title="Search expense">
                    <IconButton onClick={openField}>
                        <SearchOutlined fontSize={iconSize} />
                    </IconButton>
                </Tooltip>
            ) : (
                <TextField
                    placeholder="Search expense"
                    size="small"
                    autoFocus
                    value={searchVal}
                    onChange={onChangeHandler}
                    onKeyDown={e => {
                        if (e.key === 'Escape') {
                            looseFocus();
                        }
                    }}
                    onBlur={looseFocus}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlined />
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="outlined"
                />
            )}
        </Box>
    );
};
