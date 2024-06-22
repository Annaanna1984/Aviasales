import { ActionType } from '../types';

export type Ticket = {
    carrier: string;
    price: number;
    segments: Segment[];
};

type Segment = {
    date: Date;
    destination: string;
    duration: number;
    origin: string;
    stops: string[];
};

type TicketsState = {
    tickets: Ticket[];
    searchId: string;
    loading: boolean;
    ticketCount: number;
    stop: boolean;
    error: boolean;
};

type ActionTicket = {
    type: ActionType.FETCH_TICKETS;
    data: {
        tickets: [];
    };
};

type ActionLoading = {
    type: ActionType.LOADING;
    payload: boolean;
};

type ActionShowMore = {
    type: ActionType.SHOW_MORE;
};

export type ActionTickets = ActionTicket | ActionLoading | ActionShowMore;

const initialState: TicketsState = {
    tickets: [],
    searchId: '',
    loading: true,
    ticketCount: 0,
    stop: false,
    error: false
};

export const ticketReducer = (state = initialState, action: ActionTickets): TicketsState => {
    switch (action.type) {
        case ActionType.FETCH_TICKETS: {
            const newTickets = state.tickets.concat(action.data.tickets);
            return {
                ...state,
                tickets: newTickets
            };
        }
        case ActionType.LOADING:
            return { ...state, loading: action.payload };
        case ActionType.SHOW_MORE:
            return { ...state, ticketCount: state.ticketCount + 5 };
        default:
            return state;
    }
};
