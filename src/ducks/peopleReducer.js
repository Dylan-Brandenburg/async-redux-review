/**
 * 4 parts:
 *  1. ACTION TYPES - these are constants
 *  2. ACTION CREATORS (these are functions need to be exported)
 *  3. INITIAL STATE
 *  4. REDUCER FUNCTION (this is also a function that needs to be exported by default)
 */

import axios from 'axios';

//ACTION TYPES - these are constants
const GET_PEOPLE = 'GET_PEOPLE';

//ACTION CREATORS
//getting all the films from the API here, notice I don't have to use .then --Async Redux takes care of this for us
export function getPeople() {
  return {
    type: GET_PEOPLE,
    payload: axios.get('https://ghibliapi.herokuapp.com/people')
  };
}

//INITIAL STATE
let initialState = {
  people: [],
  isLoading: false,
  error: []
};

//REDUCER FUNCTION
export default function peopleReducer(state = initialState, action) {
  //console.log here allows you to see if your functions are actually updating state.
  console.log('action: ', action);
  console.log('action.payload: ', action.payload);
  console.log('state: ', state);

  //we
  switch (action.type) {
    /**
     *  GET_FILMS is just 1 action type that we made above, but
     *  redux-promise-middleware adds three extra states to each type so that we can do something
     *  during those different states.
     */

    //currently making the request and loading, so set loading state to true.
    case `GET_PEOPLE_PENDING`:
      return { ...state, isLoading: true };

    /**
     *  finished loading, so set loading state to false, and redux-promise-middleware puts the
     *  response from the axios request automagically on action.payload
     */
    case `GET_PEOPLE_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        /**
         * action.payload.data is the actual array of people.
         * try to access the data you actually need in this file first.
         * (if the actual data lies in action.payload.data, don't just put action.payload)
         */
        people: action.payload.data
      };

    /**
     * finished loading, but there's an error. so set loading state to false,
     * and set error to the action.payload
     */
    case `GET_PEOPLE_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    //You should always have some kind of default action, a fallback in case nothing else is triggered in the switch statement. Usually it would be to just return state;
    default:
      return state;
  }
}
