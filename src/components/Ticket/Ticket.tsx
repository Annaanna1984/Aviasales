import React from 'react';
import style from './Ticket.module.scss';
import { Ticket } from '../../Reducer/ticketReducer';
import { formatDate, formatDuration } from '../../utils/formatUtils';

const TicketComponent = (ticket: Ticket) => {
    const { price, carrier, segments } = ticket;
    const [segmentFrom, segmentTo] = segments;

    const dateFrom = segmentFrom.date;
    const durationFrom = segmentFrom.duration;
    const { origin: originFrom, destination: destinationFrom, stops: stopsFrom } = segmentFrom;

    const dateTo = segmentTo.date;
    const durationTo = segmentTo.duration;
    const { origin: originTo, destination: destinationTo, stops: stopsTo } = segmentTo;

    function getStopsEnding(stops: number) {
        if (stops === 0) {
            return 'пересадок';
        } else if (stops === 1) {
            return 'пересадка';
        } else {
            return 'пересадки';
        }
    }

    return (
        <div className={style.ticket}>
            <div className={style.ticket__price}>{price}p</div>
            <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="logo" className={style.ticket__logo} />
            <ul className={`${style['ticket__airport']}`}>
                <li>
                    <span>
                        {originFrom} - {destinationFrom}
                    </span>
                    <br />
                    <span>{formatDate(dateFrom, durationFrom)}</span>
                </li>
                <li>
                    <span>
                        {originTo} - {destinationTo}
                    </span>
                    <br />
                    <span>{formatDate(dateTo, durationTo)}</span>
                </li>
            </ul>
            <ul className={style.ticket__time}>
                <li>
                    <span>в пути</span>
                    <br />
                    <span>{formatDuration(durationFrom)}</span>
                </li>
                <li>
                    <span>в пути</span>
                    <br />
                    <span>{formatDuration(durationTo)}</span>
                </li>
            </ul>
            <ul className={style.ticket__transfer}>
                <li>
                    <span>
                        {stopsFrom.length} {getStopsEnding(stopsFrom.length)}
                    </span>
                    <br />
                    <span>{stopsFrom.length > 0 ? stopsFrom.join(', ') : '-'}</span>
                </li>
                <li>
                    <span>
                        {stopsTo.length} {getStopsEnding(stopsTo.length)}
                    </span>
                    <br />
                    <span>{stopsTo.length > 0 ? stopsTo.join(', ') : '-'}</span>
                </li>
            </ul>
        </div>
    );
};
export default TicketComponent;
