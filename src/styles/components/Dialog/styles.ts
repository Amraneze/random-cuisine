import { blackColor, primaryColor } from '../../Colors';

const extendedPadding = '0 5rem';
const extendedPaddingAll = '2rem 5rem';
const PAPER_ROOT = {
    borderRadius: 20,
    boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white',
    maxWidth: '50rem',
    width: '50rem',
};

export const DialogStyle = {
    backdrop: {
        backgroundColor: 'black',
        opacity: '.7 !important',
    },
    paperRoot: PAPER_ROOT,
    paperRootFull: {
        ...PAPER_ROOT,
        height: '55rem',
        maxHeight: 'calc(100% - 80px)',
    },
    dialogBar: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: extendedPaddingAll,
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    closeIcon: {
        width: 24,
        height: 24,
    },
    dialogTitle: {
        padding: 0,
        width: '100%',
        margin: '0 auto',
        '& h2': {
            fontSize: '2rem',
        },
    },
    dialogContent: {
        padding: extendedPadding,
    },
    dialogText: {
        padding: 0,
        fontSize: '1.6rem',
        color: blackColor,
    },
    dialogActionsRoot: {
        padding: extendedPaddingAll,
        justifyContent: 'space-between',
    },
    dialogActions: {
        justifyContent: 'space-between',
        margin: '.8rem 0',
    },
    dialogActionLink: {
        width: '70%',
        fontSize: '1.6rem',
        fontWeight: 600,
        color: primaryColor.main,
        pointerEvents: 'visible',
        cursor: 'pointer',
        textDecoration: 'none',
    },
    dialogActionLabel: {
        margin: '0 1rem',
    },
    autoWidth: {
        width: 'auto !important',
    },
    genericDialogContentFull: {
        padding: 0,
        overflow: 'hidden',
        margin: '2rem 0',
        height: '19rem',
    },
    genericDialogContent: {
        overflow: 'hidden',
        padding: extendedPadding,
    },
} as const;
