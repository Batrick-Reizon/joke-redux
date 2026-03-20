import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_APP_API_URL

export const fetchCategories = createAsyncThunk("joke/fetchcategories", async () => {
    const res = await axios.get(`${API}/categories`)
    return (res.data)
})

export const fetchJoke = createAsyncThunk("jokes/fetchjoke", async (category) => {
    const res = await axios.get(`${API}/random?category=${category}`)
    return (res.data.value)
})

const initialState = {
    joke: "No Joke",
    categories: [],
    error: "",
    loading: false
}

const jokeSlice = createSlice({
    name: "joke",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        }).addCase(fetchJoke.pending, (state) => {
            state.joke = "Loading..."
            state.error = ""
            state.loading = true
        }).addCase(fetchJoke.fulfilled, (state, action) => {
            state.joke = action.payload
            state.error = ""
            state.loading = false
        }).addCase(fetchJoke.rejected, (state, action) => {
            state.joke = "Error",
                state.error = `Error: "No joke from category\\"${action.meta.arg}\\"not found."`
            state.loading = false
        })
    }
})

export default jokeSlice