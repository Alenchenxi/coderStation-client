import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllInterviewsTitle } from '../api/interview'

export const getAllInterviewsTitle = createAsyncThunk('interview/getAllInterviewsTitle', async (payload, thunkApi) => {
    const { data } = await fetchAllInterviewsTitle();
    thunkApi.dispatch(setInterviewTitleList(data))
})

export const interviewSlice = createSlice({
    name: "interview",
    initialState: {
        interviewTitleList: []//所有分类对应的面试题标题
    },
    reducers: {
        setInterviewTitleList: (state, { payload }) => {
            state.interviewTitleList = payload;
        }
    }
})

export const { setInterviewTitleList } = interviewSlice.actions;
export default interviewSlice.reducer;