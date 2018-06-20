import axios from 'axios';

//CONSTANTS
const GET_FILMS = 'GET_FILMS';
const ADD_FILM = 'ADD_FILM';

//ACTION CREATORS
export function getFilms() {
  return {
    type: GET_FILMS,
    payload: axios.get('https://ghibliapi.herokuapp.com/films')
  };
}

export function addFilm(film) {
  return {
    type: ADD_FILM,
    film: film
  };
}
//INITIAL STATE
let initialState = {
  films: [],
  isLoading: false,
  error: []
};

//REDUCER
export default function filmsReducer(state = initialState, action) {
  //why am I console logging this here?
  console.log(action.type);
  switch (action.type) {
    //GET_FILMS
    case `GET_FILMS_PENDING`:
      return { ...state, isLoading: true };

    case `GET_FILMS_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        films: action.payload
      };

    case `GET_FILMS_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    //ADD_FILMS
    case `ADD_FILM_PENDING`:
      return { ...state, isLoading: true };

    case `ADD_FILM_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        films: action.payload
      };

    case `ADD_FILM_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
