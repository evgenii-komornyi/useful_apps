import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IFilterState, SortCategory, SortOrder } from '../../../utils/common';

export const useFilterStore = create<IFilterState>()(
    devtools(set => ({
        searchValue: undefined,
        sortCategory: undefined,
        sortMethod: undefined,
        selectedCard: undefined,

        selectCard: (selectedCard?: number): void => {
            set({ selectedCard });
        },

        setSearchValue: (searchValue?: string): void => {
            set({ searchValue });
        },

        setSortCategory: (sortCategory?: SortCategory): void => {
            set({ sortCategory });
        },

        setSortMethod: (sortMethod?: SortOrder): void => {
            set({ sortMethod });
        },
    }))
);
