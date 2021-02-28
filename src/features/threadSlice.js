import { createSlice } from '@reduxjs/toolkit'

export const threadSlice = createSlice({
    name: 'thread',
    initialState: {
        threadId: null,
        threadName: null,
        threadVisited: false,
    },
    reducers: {
        setThread: (state, action) => {
            state.threadId = action.payload.threadId
            state.threadName = action.payload.threadName
            state.threadVisited = action.payload.threadVisited
        },
    },
})

export const { setThread } = threadSlice.actions
export const selectThreadId = state => state.thread.threadId
export const selectThreadName = state => state.thread.threadName
export const selectThreadVisited = state => state.thread.threadVisited

export default threadSlice.reducer
