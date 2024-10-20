import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAction(state, action) {
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

export const { createAnecdote, voteAction, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;