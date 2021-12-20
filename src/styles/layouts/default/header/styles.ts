import { Theme } from '@material-ui/core';

export const HeaderStyles = (theme: Theme) =>
    ({
        root: {
            flexGrow: 1,
            borderBottom: 'solid 1px #e4e4e4',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    } as const);
