import { getStoreLocal } from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout, register } from "./userActions";
import { IUserInitialState } from "./userInterface";

const initialState: IUserInitialState = {
	user: getStoreLocal('user'), 
	isLoading: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder)=> {
		builder
			.addCase(register.pending, (state)=> {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, {payload})=> {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(register.rejected, (state)=> {
				state.isLoading = false
				state.user = null
			})
			.addCase(login.pending, (state)=> {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, {payload})=> {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(login.rejected, (state)=> {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.fulfilled, (state)=> {
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, {payload})=> {
				state.user = payload.user
			})
	} 
})

export default userSlice.reducer