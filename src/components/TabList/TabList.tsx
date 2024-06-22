import React from 'react';
import style from './TabList.module.scss';
import Tab from '../Tab';

const tabIds = [1, 2, 3];

const TabList = () => {
    return (
        <ul className={style.tab}>
            {tabIds.map((id) => (
                <li key={id}>
                    <Tab id={id} />
                </li>
            ))}
        </ul>
    );
};
export default TabList;
