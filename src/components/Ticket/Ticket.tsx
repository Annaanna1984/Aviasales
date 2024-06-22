import React from 'react';
import style from './Ticket.module.scss';
import { Ticket } from '../../Reducer/ticketReducer';

const TicketComponent = (ticket: Ticket) => {
    const { price, carrier, segments } = ticket;
    const [segment0, segment1] = segments;

    const formatDuration = (duration: number) => {
        const hours = padTime(Math.floor(duration / 60));
        const minutes = padTime(duration % 60);
        return `${hours}ч ${minutes}м`;
    };

    const formatDate = (date: Date, duration: number) => {
        const newDate = new Date(date);
        const endDate = new Date(newDate.getTime() + duration * 60000);
        return `${padTime(newDate.getHours())}:${padTime(newDate.getMinutes())} -
            ${padTime(endDate.getHours())}:${padTime(endDate.getMinutes())}`;
    };

    const padTime = (num: number): string => {
        return num.toString().padStart(2, '0');
    };

    const date0 = segment0.date;
    const duration0 = segment0.duration;
    const { origin: origin0, destination: destination0, stops: stops0 } = segment0;

    const date1 = segment1.date;
    const duration1 = segment1.duration;
    const { origin: origin1, destination: destination1, stops: stops1 } = segment1;

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
                        {origin0} - {destination0}
                    </span>
                    <br />
                    <span>{formatDate(date0, duration0)}</span>
                </li>
                <li>
                    <span>
                        {origin1} - {destination1}
                    </span>
                    <br />
                    <span>{formatDate(date1, duration1)}</span>
                </li>
            </ul>
            <ul className={style.ticket__time}>
                <li>
                    <span>в пути</span>
                    <br />
                    <span>{formatDuration(duration0)}</span>
                </li>
                <li>
                    <span>в пути</span>
                    <br />
                    <span>{formatDuration(duration1)}</span>
                </li>
            </ul>
            <ul className={style.ticket__transfer}>
                <li>
                    <span>
                        {stops0.length} {getStopsEnding(stops0.length)}
                    </span>
                    <br />
                    <span>{stops0.length > 0 ? stops0.join(', ') : '-'}</span>
                </li>
                <li>
                    <span>
                        {stops1.length} {getStopsEnding(stops1.length)}
                    </span>
                    <br />
                    <span>{stops1.length > 0 ? stops1.join(', ') : '-'}</span>
                </li>
            </ul>
        </div>
    );
};
export default TicketComponent;
