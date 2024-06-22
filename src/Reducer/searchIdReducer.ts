import { ActionType } from '../types';

export type IdState = {
    searchId: string;
};

export type ActionSearchIdType = {
    type: ActionType.FETCH_SEARCH_ID;
    data: {
        searchId: string;
    };
};

const initialState: IdState = {
    searchId: ''
};

export const searchIdReducer = (state = initialState, action: ActionSearchIdType): IdState => {
    switch (action.type) {
        case ActionType.FETCH_SEARCH_ID:
            return { ...state, searchId: action.data.searchId };
        default:
            return state;
    }
};
