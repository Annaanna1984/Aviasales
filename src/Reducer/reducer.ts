import { combineReducers } from 'redux';
import { filterReducer } from './filterReducer';
import { sortReducer } from './sortReducer';
import { searchIdReducer } from './searchIdReducer';
import { ticketReducer } from './ticketReducer';

export const reducer = combineReducers({
    filter: filterReducer,
    sort: sortReducer,
    searchId: searchIdReducer,
    ticket: ticketReducer
});

export type ReducerState = ReturnType<typeof reducer>;
