import React, { useEffect } from 'react';
import style from './TicketList.module.scss';
import TicketComponent from '../Ticket';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchSearchId, fetchTickets, load } from '../../actions';
import { Spin } from 'antd';
import { ActionTickets, Ticket } from '../../Reducer/ticketReducer';
import { Dispatch } from 'redux';

const TicketList = () => {
    const dispatch: Dispatch<ActionTickets> = useDispatch();
    const currentSearchId = useTypedSelector((state) => state.searchId);
    const allTickets = useTypedSelector((state) => state.ticket.tickets);
    const loading = useTypedSelector((state) => state.ticket.loading);
    const ticketCount = useTypedSelector((state) => state.ticket.ticketCount);
    const error = useTypedSelector((state) => state.ticket.error);

    const filters = useTypedSelector((state) => state.filter.labels);
    const activeFilters = filters.filter((filter) => filter.checked).map((e) => e.stopCount);

    const tab = useTypedSelector((state) => state.sort.filters);
    const activeTab = tab.filter((tab) => tab.checked).find((tab) => tab.id);

    const filterTickets = (ticket: Ticket, stopCounts: number[]) => {
        const segStopsTo = ticket.segments[0].stops.length;
        const segStopsFrom = ticket.segments[1].stops.length;

        let segStopsToMatch;
        let segStopsFromMatch;
        stopCounts.forEach((e) => {
            if (segStopsTo === e) {
                segStopsToMatch = true;
            }
            if (segStopsFrom === e) {
                segStopsFromMatch = true;
            }
        });

        return segStopsToMatch && segStopsFromMatch;
    };

    let filteredTickets: Ticket[];
    if (!allTickets) {
        filteredTickets = [];
    } else if (activeFilters.length === 5) {
        filteredTickets = allTickets;
    } else {
        filteredTickets = allTickets.filter((e) => filterTickets(e, activeFilters));
    }

    if (activeTab && activeTab.id === 1) {
        filteredTickets = filteredTickets.sort((a, b) => a.price - b.price);
    } else if (activeTab && activeTab.id === 2) {
        filteredTickets = filteredTickets.sort(
            (a, b) => a.segments[0].duration + a.segments[1].duration - b.segments[0].duration - b.segments[1].duration
        );
    }

    useEffect(() => {
        if (currentSearchId) {
            dispatch(load(true));
            fetchTickets(currentSearchId)(dispatch);
        } else {
            fetchSearchId()(dispatch);
        }
    }, [dispatch, currentSearchId]);

    useEffect(() => {
        fetchSearchId()(dispatch);
    }, [dispatch]);

    if (error) {
        return <div className={style.ticketList__notification}>Ошибка при получении данных на сервере</div>;
    }

    return (
        <ul className={style.ticketList}>
            {loading && <Spin className={style.spin} size="large" />}
            {!loading && filteredTickets.length === 0 ? (
                <div className={style.ticketList__notification}>
                    Рейсов, подходящих под заданные фильтры, не найдено
                </div>
            ) : (
                filteredTickets?.slice(0, ticketCount + 5).map((ticket: Ticket, index: number) => (
                    <li key={index}>
                        <TicketComponent {...ticket} />
                    </li>
                ))
            )}
        </ul>
    );
};
export default TicketList;
