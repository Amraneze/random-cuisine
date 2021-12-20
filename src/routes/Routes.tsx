import { FC, ComponentType, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { Layout } from '@layouts';
// import { Loader } from '@components';
import { ACCOUNT_ALREADY_CREATED_KEY, getDataFromLocalStorage } from '@utils';
import { RoutersConstant } from './RoutersConstant';
import { FallbackView } from './FallbackView';

const Home = lazy(() => import('../views/Home/Home'));
const Creation = lazy(() => import('../views/Creation/Creation'));
const Suggestions = lazy(() => import('../views/Suggestions/Suggestions'));

interface Props<T> extends RouteProps {
    component: ComponentType<RouteComponentProps<T>> | ComponentType<T>;
}

const RouteWrapper = ({ component: Component, ...rest }: Props<Record<string, unknown>>) => {
    const { path } = rest;
    const isAccountAlreadyCreated = getDataFromLocalStorage<boolean>(ACCOUNT_ALREADY_CREATED_KEY, false);
    return path !== RoutersConstant.CREATION && !isAccountAlreadyCreated ? (
        <Redirect to={RoutersConstant.CREATION} />
    ) : (
        <Route
            {...rest}
            render={(props) => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
};

const Routes: FC = () => (
    <BrowserRouter>
        <Suspense fallback={<FallbackView />}>
            <Switch>
                <RouteWrapper exact path={RoutersConstant.HOME} component={Home} />
                <RouteWrapper exact path={RoutersConstant.CREATION} component={Creation} />
                <RouteWrapper exact path={RoutersConstant.SUGGESTIONS} component={Suggestions} />
            </Switch>
        </Suspense>
    </BrowserRouter>
);

export default Routes;
