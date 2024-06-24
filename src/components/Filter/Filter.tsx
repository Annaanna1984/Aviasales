import React from 'react';
import style from './Filter.module.scss';
import { useDispatch } from 'react-redux';
import { filter, filterAll } from '../../actions';
import { Dispatch } from 'redux';
import { LabelAction } from '../../types/filter';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type FilterProps = {
    id: number;
};

const Filter = ({ id }: FilterProps) => {
    const dispatch: Dispatch<LabelAction> = useDispatch();

    const curFilter = useTypedSelector((state) => state.filter.labels.find((label) => label.id === id));

    const handleFilterChange = () => {
        if (id === 1) {
            dispatch(filterAll());
        } else {
            dispatch(filter(id));
        }
    };

    return (
        <>
            {curFilter && (
                <button onClick={handleFilterChange} className={style.filter__button}>
                    <input type="checkbox" checked={curFilter.checked} id={`${id}`} readOnly={true} />
                    <label className={style.filter__name} htmlFor="id">
                        {curFilter.labelTxt}
                    </label>
                </button>
            )}
        </>
    );
};
export default Filter;
