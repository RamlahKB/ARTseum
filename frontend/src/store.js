import {createStore, applyMiddleware, compose} from 'redux'; 
import thunk from 'redux-thunk';
import rootRed from './Components/rootRed';

const middle = [thunk];
const initState = {};
const store = createStore(
    rootRed,
    initState,
    compose(
        applyMiddleware(...middle),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;