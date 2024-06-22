import { ActionType } from '../types';
import { LabelAction, LabelState } from '../types/filter';

const initialState: LabelState = {
    labels: [
        { labelTxt: 'Все', id: 1, checked: true, stopCount: -1 },
        { labelTxt: 'Без пересадок', id: 2, checked: true, stopCount: 0 },
        { labelTxt: '1 пересадка', id: 3, checked: true, stopCount: 1 },
        { labelTxt: '2 пересадки', id: 4, checked: true, stopCount: 2 },
        { labelTxt: '3 пересадки', id: 5, checked: true, stopCount: 3 }
    ]
};

export const filterReducer = (state = initialState, action: LabelAction): LabelState => {
    switch (action.type) {
        case ActionType.FILTER: {
            const labels = [...state.labels];
            const newLabels = labels.map((label) =>
                label.id === action.payload ? { ...label, checked: !label.checked } : label
            );

            const isAllChecked = newLabels.filter((label) => label.id !== 1).every((label) => label.checked);

            if (isAllChecked) {
                newLabels[0] = { ...newLabels[0], checked: true };
            } else {
                newLabels[0] = { ...newLabels[0], checked: false };
            }

            return {
                ...state,
                labels: newLabels
            };
        }
        case ActionType.FILTERALL: {
            const labels = [...state.labels];

            const isAllChecked = labels.filter((label) => label.id !== 1).every((label) => label.checked);

            const newLabels = labels.map((label) => ({
                ...label,
                checked: !isAllChecked
            }));

            return {
                ...state,
                labels: newLabels
            };
        }
        default:
            return state;
    }
};
