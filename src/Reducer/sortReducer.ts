import { ActionType } from '../types';

type Filter = {
    label: string;
    id: number;
    checked: boolean;
};

type FilterState = {
    filters: Filter[];
};

export type ActionFilter = {
    type: ActionType.SORT;
    payload: number;
};

const initialState: FilterState = {
    filters: [
        { label: 'Самый дешёвый', id: 1, checked: true },
        { label: 'Самый быстрый', id: 2, checked: false },
        { label: 'Оптимальный', id: 3, checked: false }
    ]
};

export const sortReducer = (state = initialState, action: ActionFilter): FilterState => {
    switch (action.type) {
        case ActionType.SORT: {
            const filters = [...state.filters];
            const newFilters = filters.map((filter) => {
                return { ...filter, checked: filter.id === action.payload };
            });

            return {
                ...state,
                filters: newFilters
            };
        }
        default:
            return state;
    }
};
