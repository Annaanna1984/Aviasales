import { ActionType } from '../types';

type Label = {
    labelTxt: string;
    id: number;
    checked: boolean;
    stopCount: number;
};

type FilterAction = {
    type: ActionType.FILTER;
    payload: number;
};

type FilterAllAction = {
    type: ActionType.FILTERALL;
};

export type LabelAction = FilterAction | FilterAllAction;

export type LabelState = {
    labels: Label[];
};
