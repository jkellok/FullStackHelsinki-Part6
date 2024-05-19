import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementVotes.pending, (state) => {
        console.log("incrementVotes pending")
      })
      .addCase(incrementVotes.rejected, (state) => {
        console.log("incrementVotes rejected")
      })
      .addCase(incrementVotes.fulfilled, (state, { payload }) => {
        const id = payload.id
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote : payload
        )
      })
  }
})

export const { incrementVotesOf, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVotes = createAsyncThunk(
  'anecdotes/incrementVotes',
  async (anecdote) => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const { id, ...anecdoteData } = changedAnecdote
    const response = await anecdoteService.incrementVote(id, anecdoteData)
    return response
  }
)

export default anecdoteSlice.reducer