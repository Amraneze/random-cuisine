import {
    Reducer,
    Action,
    CombinedState,
    combineReducers,
    StateFromReducersMapObject,
    ActionFromReducersMapObject,
} from 'redux';
import DialogReducer, { DialogState } from './DialogReducer';
import HeaderReducer, { HeaderState } from './HeaderReducer';

export * from './HeaderReducer';
export * from './DialogReducer';

type Reducers = {
    dialog: Reducer<DialogState>;
    header: Reducer<HeaderState>;
};

export type States = {
    dialog: DialogState;
    header: HeaderState;
};

const appReducers: Reducer<
    CombinedState<StateFromReducersMapObject<Reducers>>,
    ActionFromReducersMapObject<Reducers>
> = combineReducers<States, Action>({
    dialog: DialogReducer,
    header: HeaderReducer,
});

export const RootReducer: Reducer<
    CombinedState<StateFromReducersMapObject<Reducers>>,
    ActionFromReducersMapObject<Reducers>
> = (state: States | undefined, action: Action<string>) =>
    appReducers(action.type === 'RESET_STATE' ? undefined : state, action);
