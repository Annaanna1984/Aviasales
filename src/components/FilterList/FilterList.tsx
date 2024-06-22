import React from 'react';
import style from './FilterList.module.scss';
import Filter from '../Filter';

const filterIds = [1, 2, 3, 4, 5];

const FilterList = () => {
    return (
        <aside className={style.filter}>
            <h3 className={style.filter__name}>количество пересадок</h3>
            <ul className={style.filter__list}>
                {filterIds.map((id) => (
                    <li className={style.filter__item} key={id}>
                        <Filter id={id} />
                    </li>
                ))}
            </ul>
        </aside>
    );
};
export default FilterList;
