import React from 'react';
import style from './Tab.module.scss';
import { useDispatch } from 'react-redux';
import { sort } from '../../actions';
import { Dispatch } from 'redux';
import { ActionFilter } from '../../Reducer/sortReducer';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type TabProps = {
    id: number;
};

const Tab = ({ id }: TabProps) => {
    const dispatch: Dispatch<ActionFilter> = useDispatch();
    const filter = useTypedSelector((state) => state.sort.filters.find((label) => label.id === id));

    const handleTabChange = () => {
        dispatch(sort(id));
    };

    return (
        <>
            {filter && (
                <button
                    className={filter.checked ? style.tab__item__checked : style.tab__item}
                    id={id.toString()}
                    onClick={handleTabChange}
                >
                    {' '}
                    {filter.label}
                </button>
            )}
        </>
    );
};
export default Tab;
