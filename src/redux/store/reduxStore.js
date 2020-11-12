import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import createSagaMiddleware from "redux-saga";
import {forbiddenWordsMiddleware} from "../middleware/reduxMidleware";
import apiSaga from "../sagas/reduxSaga";
import rootReducer from "../reducers/reduxReducer";

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    rootReducer,
    storeEnhancers(
        applyMiddleware(forbiddenWordsMiddleware, initialiseSagaMiddleware)
    )
);

initialiseSagaMiddleware.run(apiSaga);

export default store;