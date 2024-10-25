import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    vote(state, action) {
      const anecdote = action.payload;
      return state.map(a => a.id !== anecdote.id ? a : anecdote);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});


export const { appendAnecdote, setAnecdotes, vote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAction = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToUpdate = getState()
      .anecdotes
      .find(a => a.id === id);
    const updatedAnecdote = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1
    };
    await anecdoteService.update(id, updatedAnecdote);

    dispatch(vote(updatedAnecdote));
  };
} 

export default anecdoteSlice.reducer;