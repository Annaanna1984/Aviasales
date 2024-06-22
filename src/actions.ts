import { ActionType } from './types';
import { Dispatch } from 'redux';
import { ActionSearchIdType, IdState } from './Reducer/searchIdReducer';
import { ActionTickets } from './Reducer/ticketReducer';
import { ActionFilter } from './Reducer/sortReducer';
import { LabelAction } from './types/filter';

export function filter(id: number): LabelAction {
    return {
        type: ActionType.FILTER,
        payload: id
    };
}

export function filterAll(): LabelAction {
    return {
        type: ActionType.FILTERALL
    };
}

export function sort(id: number): ActionFilter {
    return {
        type: ActionType.SORT,
        payload: id
    };
}

export function load(isLoading: boolean): ActionTickets {
    return {
        type: ActionType.LOADING,
        payload: isLoading
    };
}

export function showMore(): ActionTickets {
    return {
        type: ActionType.SHOW_MORE
    };
}

export const fetchSearchId = () => {
    return async (dispatch: Dispatch<ActionSearchIdType>) => {
        try {
            const res = await fetch('https://aviasales-test-api.kata.academy/search');
            const data = await res.json();
            if (!data.searchId) {
                throw new Error();
            }
            dispatch({
                type: ActionType.FETCH_SEARCH_ID,
                data: data
            });
            return data.searchId;
        } catch (e) {
            throw new Error('Ошибка при выполнений поиска');
        }
    };
};

export const fetchTickets = ({ searchId }: IdState) => {
    return async (dispatch: Dispatch<ActionTickets>) => {
        if (searchId === '') return null;
        let response;
        try {
            response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
            const data = await response.json();
            dispatch({
                type: ActionType.FETCH_TICKETS,
                data: { ...data, error: false }
            });
            if (data.stop) {
                dispatch(load(false));
            } else {
                await fetchTickets({ searchId })(dispatch);
            }
        } catch (e) {
            if (response?.status === 500) {
                await fetchTickets({ searchId })(dispatch);
            }
            dispatch({
                type: ActionType.FETCH_TICKETS,
                data: { tickets: [], stop: false, error: true }
            } as ActionTickets);
        }
    };
};
