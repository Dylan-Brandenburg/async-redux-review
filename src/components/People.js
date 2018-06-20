/**
 * our goal: get the people from redux, and render those people on cards
 * steps:
 *  1. import { connect} from 'react-redux';
 *  2. import the action creator getPeople from our reducer
 *  3. use connect on the export statement on the last line.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPeople } from '../ducks/peopleReducer';
import './People.css';

class People extends Component {
  componentDidMount() {
    //this calls the action creator in our peopleReducer to start the process of getting people.
    this.props.getPeople();
  }
  render() {
    //yay! our state from redux is now mapped to our props and available to access.
    const { people, isLoading } = this.props;

    // this ternary takes care of the fact that our people array might not have people immediately right off the bat.
    /**
     *  ex. is the axios request is still loading ?
     *        show a loader :
     *        otherwise it must be finished loading, so map through it.
     *
     */
    let peopleDisplay = isLoading ? (
      <p>Loading...</p>
    ) : (
      people.map((person, index) => {
        return (
          <div className="card people-card" key={person.id}>
            <h3>{person.name}</h3>
            <span>gender: {person.gender}</span>
            <span>Eye Color: {person.eye_color}</span>
            <span>Age: {person.age}</span>
          </div>
        );
      })
    );

    return (
      <div>
        <h1>People from the Films</h1>
        <div className="film-container">{peopleDisplay}</div>
      </div>
    );
  }
}

//you make this function to tell redux what redux state you want to make available on this.props;
//if you have multiple reducers, you FIRST have to specify the reducer by it's key that you named in store.js
const mapStateToProps = state => {
  //here I'm accessing all of the state from the people reducer.
  //this is what I usually prefer.
  return state.people;

  //if I wanted to access just the people array on state from the people reducer
  //return state.people.people

  // if I wanted to access some, but not all state from multiple different reducers
  // I also prefer this method to access certain state from different reducers.
  // return {
  //   people: state.people.people,
  //   isPeopleLoading: state.people.isLoading,
  //   films: state.films.films,
  //   isFilmsLoading: state.films.isLoading
  // }

  //if I wanted to access all state from all reducers
  // return {
  //   ...state.people,
  //   ...state.films
  // }
};

/**
 * connect(mapStateToProps, { getPeople })(People)
 */
export default connect(
  mapStateToProps,
  { getPeople }
)(People);
