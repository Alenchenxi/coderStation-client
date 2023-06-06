import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { modifyUserInfo } from '../api/user'

export const updateUserInfoAsync = createAsyncThunk('user/updateUserInfoAsync', async ({ id, newInfo }, thunkApi) => {
    await modifyUserInfo(id, newInfo);
    thunkApi.dispatch(updatefyUserInfo(newInfo))
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,//是否登录
        userInfo: {},//用户信息
        autoLogin: false//是否自动登录
    },
    reducers: {
        // 设置用户信息
        setUserInfo: (state, { payload }) => {
            state.userInfo = payload;
        },
        // 设置登录状态
        setLogin: (state, { payload }) => {
            state.isLogin = payload;
        },
        // 是否自动登录
        setAutoLogin: (state, { payload }) => {
            state.autoLogin = payload;
        },
        updatefyUserInfo: (state, { payload }) => {
            for (const key in payload) {
                state.userInfo[key] = payload[key];
            }
        }
    },
})

export const { setLogin, setUserInfo, setAutoLogin, updatefyUserInfo } = userSlice.actions;
export default userSlice.reducer;