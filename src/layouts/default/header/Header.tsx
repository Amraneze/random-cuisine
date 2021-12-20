import { ReactElement } from 'react';
import { Map } from 'immutable';
import { connect, ConnectedProps } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles } from '@material-ui/core';
import { HeaderStyles } from '@styles';
import { HeaderState } from '@redux';

const useStyles = makeStyles<Theme>(HeaderStyles);

const mapStateToProps = ({ header }: { header: Map<string, HeaderState> }): HeaderState => {
    const { title } = header.toJS() as HeaderState;
    return { title };
};

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>;

function Header({ title }: Props): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default connector(Header);
