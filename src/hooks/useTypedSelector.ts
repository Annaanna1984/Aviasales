import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { ReducerState } from '../Reducer/reducer';

export const useTypedSelector: TypedUseSelectorHook<ReducerState> = useSelector;
