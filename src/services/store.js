import { configureStore } from "@reduxjs/toolkit";
import { summarizeAPI } from "./slices/summarizeAPI";
import articlesReducer from "../services/slices/articles";

const store = configureStore({
	reducer: {
		[summarizeAPI.reducerPath]: summarizeAPI.reducer,
		articles: articlesReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(summarizeAPI.middleware),
});

export default store;
