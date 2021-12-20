import { ReduxActionType } from '@types';
import { UPDATE_HEADER_TITLE } from '../constants/HeaderConstants';

type HeaderState = ReduxActionType & {
    payload: {
        title: string;
    };
};

export const changeHeaderTitle = (title: string): HeaderState => ({
    type: UPDATE_HEADER_TITLE,
    payload: {
        title,
    },
});
