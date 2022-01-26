import { createSlice } from "@reduxjs/toolkit";

// A "slice" is a collection of Redux reducer logic and actions for a single feature in an application.
// The navigation slice is responsible for storing the user navigation information

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  // A reducer is a pure function that takes an action and the previous state and returns the new state. A "transition"
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    }
  }
});

// Use destructuring to export the reducer actions for use in other parts of the application.
export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;

// Selectors
// A selector is a function that accepts the Redux state as an argument and returns data that is derived from that state.
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer;