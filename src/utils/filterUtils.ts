import { Ticket } from '../Reducer/ticketReducer';
import { Label } from '../types/filter';

const checkStopsMatch = (ticket: Ticket, stopCounts: Label[]) => {
    const segStopsTo = ticket.segments[0].stops.length;
    const segStopsFrom = ticket.segments[1].stops.length;

    let segStopsToMatch;
    let segStopsFromMatch;
    stopCounts.forEach((e) => {
        if (segStopsTo === e.stopCount) {
            segStopsToMatch = true;
        }
        if (segStopsFrom === e.stopCount) {
            segStopsFromMatch = true;
        }
    });

    return segStopsToMatch && segStopsFromMatch;
};

export const filterTicketsByStops = (allTickets: Ticket[], activeFilters: Label[]) => {
    if (!allTickets) {
        return [];
    } else if (activeFilters.length === 5) {
        return allTickets;
    } else {
        return allTickets.filter((e) => checkStopsMatch(e, activeFilters));
    }
};

export const sortTickets = (tickets: Ticket[], activeTabId: number) => {
    if (activeTabId === 1) {
        return tickets.sort((a, b) => a.price - b.price);
    } else if (activeTabId === 2) {
        return tickets.sort(
            (a, b) => a.segments[0].duration + a.segments[1].duration - b.segments[0].duration - b.segments[1].duration
        );
    } else {
        return tickets;
    }
};
