import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from '@material-ui/core/styles';
import { store } from '@redux';
import { theme } from '@themes';
import { Routes } from '@routes';
import { Dialog } from '@components';
import { ErrorBoundary as ErrorBoundaryFallback } from '@views';
import './i18n/config';

function App(): ReactElement {
    const reportErrorToServer = (error: Error, info: { componentStack: string }) => {
        // TODO send logs to server
        // eslint-disable-next-line no-console
        console.log({ error, info });
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onError={reportErrorToServer}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Routes />
                    <Dialog />
                </ThemeProvider>
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
