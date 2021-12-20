import { Action, createStore } from 'redux';
import { RootReducer, States } from './reducers';

export interface RootState {
    dialog: States['dialog'];
    header: States['header'];
}

export default createStore<RootState, Action, unknown, unknown>(RootReducer);
