import { ReduxActionType } from '@types';
import { CHANGE_DIALOG_VISIBILITY } from '../constants/DialogConstants';
import { DialogState } from '../reducers/DialogReducer';

const commonKey = 'common.';
const dialogKey = 'components.dialog.';

type State = ReduxActionType & DialogState;

export const displayDialog = (): State => ({
    type: CHANGE_DIALOG_VISIBILITY,
    show: true,
    props: {
        fullScreen: false,
        open: true,
        isExtended: false,
        isCloseIconDisplayed: false,
        dialog: {
            title: `${dialogKey}errTech`,
            text: `${dialogKey}errTechText`,
            buttons: {
                primary: {
                    text: `${commonKey}ok`,
                },
            },
        },
    },
});

export const closeDialog = (): State => ({
    type: CHANGE_DIALOG_VISIBILITY,
    show: false,
    props: {
        open: false,
        fullScreen: false,
        isExtended: false,
        isCloseIconDisplayed: false,
        dialog: {
            text: '',
            title: '',
            buttons: {},
        },
    },
});
