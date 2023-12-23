import { AuthService } from "@/services/auth/authService";
import { toastError } from "@/utils/toastError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorCatch } from "api/apiHelpers";
import { toast } from "react-toastify";
import { IAuthResponse, IEmailPassword } from "./userInterface";

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>('auth/register', async (
    {email, password}, thunkAPI) => {
    try {
        const response = await AuthService.register(email, password)
        toast.success('Registration successful!')
        return response.data
    } catch (error) {
        toastError(error)
        return thunkAPI.rejectWithValue(error)
    }
})

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>('auth/login', async (
    {email, password}, thunkAPI) => {
    try {
        const response = await AuthService.login(email, password)
        toast.success('Login successful!')
        return response.data
    } catch (error) {
        toastError(error)
        return thunkAPI.rejectWithValue(error)
    }
})

export const logout = createAsyncThunk('auth/logout', async ()=> {
    await AuthService.logout()
}) 

export const checkAuth = createAsyncThunk<IAuthResponse>('auth/check-auth', async (_, thunkAPI) => {
    try {
        const response = await AuthService.getNewToken()
        return response.data
    } catch (error) {
        if (errorCatch(error) === 'jwt expired') {
            toast.error('Your authorizaiton is finished, plz sign in again')
            thunkAPI.dispatch(logout())
        } 
        
        return thunkAPI.rejectWithValue(error)
    }
})
