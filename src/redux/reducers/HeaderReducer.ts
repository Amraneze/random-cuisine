import Immutable, { Map } from 'immutable';
import { Reducer } from 'redux';
import { createReducer } from 'redux-immutablejs';
import { UPDATE_HEADER_TITLE } from '../constants';

const initialState: State = {
    title: 'Home',
};

type State = {
    title: string;
};

const reducer: Reducer<State> = createReducer(Immutable.fromJS(initialState), {
    [UPDATE_HEADER_TITLE]: (state: Map<string, State>, { payload: { title } }: { payload: State }) =>
        state.merge<State>(
            Immutable.fromJS({
                title,
            })
        ),
});

export default reducer;
export type { State as HeaderState };
