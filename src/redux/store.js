import { configureStore } from '@reduxjs/toolkit'
import useReducer from './userSlice'
import typeReducer from './typeSlice'
import interviewReducer from './interviewSlice'

export default configureStore({
    reducer: {
        user: useReducer,
        type: typeReducer,
        interview: interviewReducer
    }
})