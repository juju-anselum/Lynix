import { configureStore } from "@reduxjs/toolkit";

import { summarizeAPI } from "./summarizeAPI"

const store = configureStore({
	reducer: {
		[summarizeAPI.reducerPath]: summarizeAPI.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(summarizeAPI.middleware),
})

export default store