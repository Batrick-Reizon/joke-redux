import { configureStore } from "@reduxjs/toolkit";
import jokeSlice from "./JokeSlice";

const store = configureStore({
    reducer: {
        joke: jokeSlice.reducer
    }
})

export default store