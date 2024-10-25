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
      const id = action.payload;
      const anecdoteToVote = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      };
      return state.map(a => a.id !== id ? a : changedAnecdote);
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
  return async dispatch => {
    dispatch(vote(id));
  };
} 

export default anecdoteSlice.reducer;