import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage(state) {
      return ''
    }
  }
})

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(removeMessage())
    }, time * 1000)
  }
}

export const { setMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer