import { ReactElement, ReactNode } from 'react';
import { Grid, Box } from '@material-ui/core';
import { Header } from './header';

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
    return (
        <Grid container wrap="nowrap" direction="column">
            <Header />
            <Box p={4}>{children}</Box>
        </Grid>
    );
}
