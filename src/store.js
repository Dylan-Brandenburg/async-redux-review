//we need createStore and applyMiddleware if we want to be able to
//  do asynchronous things in Redux.
//combineReducers - only if you have multiple reducers
import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

//importing my reducers
import filmsReducer from './ducks/filmsReducer';
import peopleReducer from './ducks/peopleReducer';

//combining your reducers
//the keys "films" and "people" are how you will be accessing the state from the different reducers
//ex. People.js :: line 59
const multipleReducers = combineReducers({
  films: filmsReducer,
  people: peopleReducer
});

//applyMiddleware is the way to apply middleware packages to Redux.
//the middleware we are using is redux-promise-middleware which we imported as promiseMiddlware
const middleware = applyMiddleware(promiseMiddleware());

//createStore takes two arguments
//  1. the reducers
//  2. the middlware
const store = createStore(multipleReducers, middleware);

export default store;
