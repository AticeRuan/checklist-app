import { createSlice } from '@reduxjs/toolkit'

const initialState = { comments: [] }

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments(state, action) {
      state.comments = action.payload
    },
    addComment(state, action) {
      state.comments.push(action.payload)
    },
  },
})

export const { setComments, addComment } = commentSlice.actions

export default commentSlice.reducer
