import React from 'react';
import './Pagination.scss';
import { useDispatch } from 'react-redux';
import { showMore } from '../../actions';
import { Dispatch } from 'redux';
import { ActionTickets } from '../../Reducer/ticketReducer';

const Pagination = () => {
    const dispatch: Dispatch<ActionTickets> = useDispatch();

    const showFiveTickets = () => {
        dispatch(showMore());
    };

    return (
        <button className="pagination" type="button" onClick={showFiveTickets}>
            <span>Показать еще 5 билетов!</span>
        </button>
    );
};
export default Pagination;
