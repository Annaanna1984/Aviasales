/* eslint-disable */
import React, { useEffect, useMemo } from 'react';
import style from './TicketList.module.scss';
import TicketComponent from '../Ticket';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchSearchId, fetchTickets, load } from '../../actions';
import { Spin } from 'antd';
import { ActionTickets, Ticket } from '../../Reducer/ticketReducer';
import { Dispatch } from 'redux';
import { filterTicketsByStops, sortTickets } from '../../utils/filterUtils';
let hash = require('object-hash');

const TicketList = () => {
    const dispatch: Dispatch<ActionTickets> = useDispatch();
    const currentSearchId = useTypedSelector((state) => state.searchId);
    const allTickets = useTypedSelector((state) => state.ticket.tickets);
    const loading = useTypedSelector((state) => state.ticket.loading);
    const ticketCount = useTypedSelector((state) => state.ticket.ticketCount);
    const error = useTypedSelector((state) => state.ticket.error);

    const filters = useTypedSelector((state) => state.filter.labels);
    const activeFilters = filters.filter((filter) => filter.checked);

    const tab = useTypedSelector((state) => state.sort.filters);
    const activeTabId = tab.filter((tab) => tab.checked).find((tab) => tab.id)?.id ?? 0;

    const filteredTickets = useMemo(() => filterTicketsByStops(allTickets, activeFilters), [allTickets, activeFilters]);

    const sortedTickets = useMemo(() => sortTickets(filteredTickets, activeTabId), [filteredTickets, activeTabId]);

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
            {!loading && sortedTickets.length === 0 ? (
                <div className={style.ticketList__notification}>
                    Рейсов, подходящих под заданные фильтры, не найдено
                </div>
            ) : (
                sortedTickets?.slice(0, ticketCount + 5).map((ticket: Ticket) => (
                    <li key={hash(ticket)}>
                        <TicketComponent {...ticket} />
                    </li>
                ))
            )}
        </ul>
    );
};
export default TicketList;
