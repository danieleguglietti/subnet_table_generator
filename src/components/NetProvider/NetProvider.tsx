import React, { createContext, useContext, useReducer } from 'react';
import type { Net } from '../../Nets';

type ReducerAction = { type: 'UPDATE'; payload: Net[] };

interface IReducerState {
	nets: Net[];
}

const initialState: IReducerState = { nets: [] };
const NetReducer: React.Reducer<IReducerState, ReducerAction> = (
	state: IReducerState = initialState,
	action: ReducerAction
) => {
	let newState: IReducerState = { nets: [] };

	switch (action.type) {
		case 'UPDATE':
			newState.nets = action.payload;
			break;
	}
	return newState;
};

const NetContext = createContext<{
	state: IReducerState;
	dispatch: React.Dispatch<any>;
}>({
	state: { nets: [] },
	dispatch: () => null
});

interface INetProvider {
	children: JSX.Element | JSX.Element[];
}

const ProviderNet = (props: INetProvider): JSX.Element => {
	const [state, dispatch] = useReducer(NetReducer, initialState);
	return <NetContext.Provider value={{ state, dispatch }}>{props.children}</NetContext.Provider>;
};

const useNetContext = () => useContext(NetContext);

export default ProviderNet;
export { useNetContext };
