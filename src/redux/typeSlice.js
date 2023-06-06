import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllTypes as getAllTypes } from '../api/type'

export const fetchAllTypes = createAsyncThunk('type/initialTypes', async (payload, thunkApi) => {
    const result = await getAllTypes();
    return result.data
})

export const typeSlice = createSlice({
    name: 'type',
    initialState: {
        types: [],//所有的分类对象数组
        issueTypeId: 'all',//问答具体的分类，默认查询所有
        bookTypeId: 'all',//书籍具体的分类，默认查询所有
    },
    reducers: {
        // 初始化所有类型
        initialTypes: (state, { payload }) => {
            state.types = payload
        },
        updateIssueTypeId: (state, { payload }) => {
            state.issueTypeId = payload;
        },
        updateBookTypeId: (state, { payload }) => {
            state.bookTypeId = payload;
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAllTypes.fulfilled, (state, { payload }) => {
            // Add user to the state array
            state.types = payload;
        })
    },
})

export default typeSlice.reducer
export const { initialTypes, updateBookTypeId, updateIssueTypeId } = typeSlice.actions