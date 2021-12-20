import Immutable, { Set } from 'immutable';
import { MouseEventHandler, ReactNode } from 'react';
import { Reducer } from 'redux';
import { createReducer } from 'redux-immutablejs';
import { CHANGE_DIALOG_VISIBILITY } from '../constants/DialogConstants';

interface DialogButtonsProps {
    text: string;
    handler?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

interface DialogProps {
    text: string;
    title: string;
    buttons: {
        [key: string]: DialogButtonsProps;
    };
}

interface InnerProps {
    fullScreen: boolean;
    open: boolean;
    onClose?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    dialog: DialogProps;
    component?: ReactNode;
    isExtended: boolean;
    isCloseIconDisplayed: boolean;
}

type State = {
    show: boolean;
    props: InnerProps;
};

const initialState: State = {
    show: false,
    props: {
        open: false,
        fullScreen: false,
        isExtended: false,
        dialog: {} as DialogProps,
        isCloseIconDisplayed: false,
    },
};

const reducer: Reducer<State> = createReducer(Immutable.fromJS(initialState), {
    [CHANGE_DIALOG_VISIBILITY]: (state: Set<State>, { show, props }: State) =>
        state.merge(
            Immutable.fromJS({
                show,
                props,
            })
        ),
});

export default reducer;
export type { State as DialogState };
