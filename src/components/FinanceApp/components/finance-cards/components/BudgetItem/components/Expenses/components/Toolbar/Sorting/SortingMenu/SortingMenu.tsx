import { FilterAlt, FilterAltOutlined } from '@mui/icons-material';
import {
    Menu,
    IconButton,
    ListSubheader,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useAnchor } from '../../../../../../../../../../../../hooks/common/useAnchor';
import { Icon } from '../../../../../../../../../../../Icon';
import {
    faArrowUpLong,
    faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
    IconSize,
    SortCategory,
    SortOrder,
} from '../../../../../../../../../../../../utils/common';
import { RotateProp } from '@fortawesome/fontawesome-svg-core';
import { useFilterStore } from '../../../../../../../../../../../../stores/finance-app/filter/filterStore';
import { ToolbarProps } from '../../Toolbar';

type SelectedCategory = {
    [key: string]: SortOrder;
};

const initialSelectedCategory: SelectedCategory = {
    amount: SortOrder.None,
    title: SortOrder.None,
    expenseDay: SortOrder.None,
};

const sortingOptions = ['amount', 'title', 'expenseDay'];

export const SortingMenu: FC<ToolbarProps> = ({ idx }) => {
    const { anchorEl, open, handleClick, handleClose } = useAnchor();
    const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>(
        initialSelectedCategory
    );
    const { setSortCategory, selectCard, setSortMethod, selectedCard } =
        useFilterStore(state => state);

    const openMenu = (event: MouseEvent<HTMLElement>): void => {
        setSelectedCategory(initialSelectedCategory);
        if (idx !== undefined) {
            selectCard(undefined);
        }
        handleClick(event);
        selectCard(idx);
    };

    const selectItem = (category: SortCategory): void => {
        setSelectedCategory(prevState => {
            const newState: SelectedCategory = Object.keys(prevState).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]:
                        key === category
                            ? (prevState[key] + 1) % 3
                            : SortOrder.None,
                }),
                {} as SelectedCategory
            );

            const selectedMethod = newState[category];

            setSortCategory(category);
            setSortMethod(selectedMethod);

            return newState;
        });
    };

    const resetSorting = (): void => {
        setSelectedCategory(initialSelectedCategory);
        setSortCategory(undefined);
        setSortMethod(undefined);
        selectCard(undefined);
    };

    const isAnyCategorySelected = Object.values(selectedCategory).some(
        value => value !== SortOrder.None
    );

    const renderSortText = (sortOrder: SortOrder): string => {
        switch (sortOrder) {
            case SortOrder.Asc:
                return 'ASC';
            case SortOrder.Desc:
                return 'DESC';
            default:
                return 'NONE';
        }
    };

    const getRotation = (sortOrder: SortOrder): RotateProp | undefined => {
        if (sortOrder === SortOrder.None) return 90;
        if (sortOrder === SortOrder.Desc) return 180;

        return undefined;
    };

    const renderIcon = (sortOrder: SortOrder) => {
        return (
            <Icon
                icon={
                    sortOrder === SortOrder.None
                        ? faArrowRightArrowLeft
                        : faArrowUpLong
                }
                size="sm"
                rotation={getRotation(sortOrder)}
                color={sortOrder === SortOrder.None ? 'white' : 'lightgreen'}
            />
        );
    };

    const iconSize: IconSize = idx === undefined ? 'medium' : 'small';

    return (
        <>
            <Tooltip title="Sort expenses">
                <IconButton
                    id="sorting-button"
                    aria-controls={open ? 'sorting-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={openMenu}
                >
                    {isAnyCategorySelected && selectedCard === idx ? (
                        <FilterAlt fontSize={iconSize} />
                    ) : (
                        <FilterAltOutlined fontSize={iconSize} />
                    )}
                </IconButton>
            </Tooltip>
            <Menu
                id="sorting-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'sorting-button' }}
            >
                <ListSubheader>Reset sorting</ListSubheader>
                <MenuItem onClick={resetSorting}>
                    <ListItemIcon>
                        <Icon
                            icon={faArrowRightArrowLeft}
                            rotation={90}
                            size="sm"
                        />
                    </ListItemIcon>
                    <ListItemText primary="NONE" />
                </MenuItem>

                {sortingOptions.map(key => {
                    const sortOrder = selectedCategory[key];

                    return (
                        <div key={key}>
                            <ListSubheader>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </ListSubheader>
                            <MenuItem
                                onClick={() => selectItem(key as SortCategory)}
                            >
                                <ListItemIcon>
                                    {renderIcon(sortOrder)}
                                </ListItemIcon>
                                <ListItemText
                                    sx={{
                                        color: `${
                                            sortOrder === SortOrder.None
                                                ? 'white'
                                                : 'lightgreen'
                                        }`,
                                    }}
                                >
                                    {renderSortText(sortOrder)}
                                </ListItemText>
                            </MenuItem>
                        </div>
                    );
                })}
            </Menu>
        </>
    );
};
