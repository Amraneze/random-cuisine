import { FC, MouseEventHandler } from 'react';
import { Map } from 'immutable';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { isEmpty } from '@utils';
import { DialogStyle } from '@styles';
import { closeDialog, DialogState } from '@redux';

const useStyles = makeStyles<Theme>(DialogStyle);

const mapStateToProps = ({ dialog }: { dialog: Map<string, DialogState> }): DialogState => {
    const dialogState = dialog.toJS() as DialogState;
    return {
        ...dialogState,
    };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type OwnProps = {
    dispatch: Dispatch;
};

type Props = PropsFromRedux & OwnProps;

const Dialog: FC<Props> = ({ show, props, dispatch }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { fullScreen, open, onClose, dialog, component, isExtended, isCloseIconDisplayed } = props;

    const hideDialog = () => dispatch(closeDialog());
    const handleOnCloseDialog = (fun?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>) => fun ?? hideDialog;

    return show ? (
        <MuiDialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleOnCloseDialog(onClose)}
            BackdropProps={{
                className: classes.backdrop,
            }}
            classes={{
                paper: isExtended ? classes.paperRootFull : classes.paperRoot,
            }}
            aria-labelledby="dialog-title"
        >
            <div className={classes.dialogBar}>
                <DialogTitle id="dialog-title" classes={{ root: classes.dialogTitle }}>
                    {t(dialog.title)}
                </DialogTitle>
                {isCloseIconDisplayed && (
                    <IconButton
                        edge="start"
                        classes={{ root: classes.closeButton }}
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon classes={{ root: classes.closeIcon }} />
                    </IconButton>
                )}
            </div>
            <DialogContent
                classes={{
                    root: isExtended ? classes.genericDialogContentFull : classes.genericDialogContent,
                }}
            >
                {dialog.text && (
                    <DialogContentText classes={{ root: classes.dialogText }}>{t(dialog.text)}</DialogContentText>
                )}
                {component ?? null}
            </DialogContent>
            <DialogActions classes={{ root: classes.dialogActionsRoot }}>
                {!isEmpty(dialog.buttons.secondary) && (
                    <Button
                        classes={{ label: classes.dialogActionLabel }}
                        onClick={handleOnCloseDialog(dialog.buttons.secondary.handler)}
                    >
                        {t(dialog.buttons.secondary.text)}
                    </Button>
                )}
                <Button
                    classes={{ label: classes.dialogActionLabel }}
                    onClick={handleOnCloseDialog(dialog.buttons.primary.handler)}
                >
                    {t(dialog.buttons.primary.text)}
                </Button>
            </DialogActions>
        </MuiDialog>
    ) : null;
};

export default connector(Dialog);
