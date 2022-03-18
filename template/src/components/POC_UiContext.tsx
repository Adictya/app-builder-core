import React, {createContext, useState, useReducer} from 'react';
import Layout from '../subComponents/LayoutEnum';

const initUiState = {
  Layout: Layout.Grid,
  setLayout: () => {},
};

const UiStateContext = createContext(initUiState);

export default UiStateContext;

export const UiStateContextConsumer = UiStateContext.Consumer;

const reducer = (state, action) => {
  let stateUpdate = {};
  switch (action.type) {
    case 'ChangeLayout':
      state.Layout = action.data;
  }
  return {...state, ...stateUpdate};
};

export const UiContextProvider: React.FC = (props) => {
  //const [uiState, dispatch] = useReducer(reducer, initUiState);
  const [uiState, dispatch] = useState(Layout.Grid);
  return (
    <UiStateContext.Provider value={{Layout: uiState, setLayout: dispatch}}>
      {props.children}
    </UiStateContext.Provider>
  );
};
